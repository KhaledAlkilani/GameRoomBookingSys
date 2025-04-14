import { BackendModule, Services, InitOptions, ReadCallback } from 'i18next';
import {
  I18nResource,
  I18nTranslation,
  I18nTranslationCacheHandler,
  I18nTranslationCacheItem,
} from '../types';
import AbortHandler, { Abort } from './AbortHandler';

/**
 * BackendPlugin error
 */
export class BackendPluginError extends Error {}

export interface BackendPluginOptions {
  /**
   * Function to disallow certain languages or namespaces.
   *
   * @param lng Language
   * @param ns Namespace
   * @returns `true` if translation is allowed, `false` if not
   * @throws Custom error if not allowed
   */
  filter?: (lng: string, ns: string) => boolean;
  /**
   * Function to fetch and parse translation from backend.
   *
   * @param lng Language
   * @param ns Namespace
   * @param options.signal AbortSignal
   * @returns Translation object. Should return `undefined` if translation does not exist in backend.
   * @throws If any other error happens besides translation not existing.
   */
  getTranslation?: GetTranslationFunction;
  /**
   * Handler for cached translations
   */
  cache?: I18nTranslationCacheHandler;
  /**
   * Maximum age of cached item.
   */
  cacheMaxAge?: number;
  /**
   * Static translation resources
   */
  resources?: I18nResource;
  /**
   * Print extra debug info.
   * Will default to i18next init value if omitted.
   */
  debug?: boolean;
}

/**
 * Function to fetch translation
 */
export type GetTranslationFunction = (
  lng: string,
  ns: string,
  options?: { signal?: AbortSignal },
) => Promise<I18nTranslation | undefined>;

/**
 * Module interface
 */
export interface BackendPluginModule
  extends BackendModule<BackendPluginOptions> {
  /**
   * Abort all async operations
   */
  abort: () => void;
  /**
   * Do not accept any new translation requests
   */
  disable: () => void;
  /**
   * Resume accepting translation requests
   */
  enable: () => void;
}

/**
 * General purpose i18next backend plugin.
 *
 * Supports fetching translation from backend, caching
 * and static resources all in one package.
 *
 * @param pluginOptions
 * @returns Backend plugin module
 */
const BackendPlugin = (
  pluginOptions?: BackendPluginOptions,
): BackendPluginModule => {
  let options: BackendPluginOptions = { ...pluginOptions };
  const abortHandler = new AbortHandler();
  let disabled = false;

  /**
   * Backend plugin
   */
  const plugin: BackendPluginModule = {
    type: 'backend',

    /**
     * Initialize plugin
     */
    init: (
      _services: Services,
      backendOptions?: Partial<BackendPluginOptions>,
      i18nOptions: InitOptions = {},
    ) => {
      options = { ...options, ...backendOptions };

      if (options.debug === undefined) {
        options.debug = i18nOptions.debug;
      }
    },

    /**
     * Read translation
     */
    read: async (lng: string, ns: string, callback: ReadCallback) => {
      if (disabled) {
        callback(new BackendPluginError('Backend plugin is disabled.'), false);
        return;
      }

      const { filter, getTranslation, cache, cacheMaxAge, resources, debug } =
        options;

      debug && console.log(`Resolve translation '${lng}/${ns}'...`);

      // Check for allowed languages and namespaces

      if (filter) {
        try {
          if (!filter(lng, ns)) {
            callback(
              new BackendPluginError(
                `Translation '${lng}/${ns}' is not allowed.`,
              ),
              false,
            );
            return;
          }
        } catch (e) {
          callback(e as Error, false);
          return;
        }
      }

      // Get possible translation from resources for later use.

      const resourceTranslation =
        resources && resources[lng] && resources[lng][ns];

      // Check cache

      let cacheResponse: I18nTranslationCacheItem | undefined;

      if (cache) {
        debug && console.log(`Check cache for translation '${lng}/${ns}'...`);

        try {
          cacheResponse = await abortHandler.call(signal =>
            cache.get(lng, ns, { signal }),
          );
        } catch (e) {
          if (e instanceof Abort) {
            callback(e, false);
            return;
          }

          debug &&
            console.error(
              `Failed to get cached translation '${lng}/${ns}'.`,
              e,
            );
        }

        // Use cached translation immediately if not expired

        if (
          cacheResponse &&
          (cacheMaxAge === undefined ||
            cacheMaxAge < 0 ||
            new Date().getTime() - cacheResponse.timestamp < cacheMaxAge)
        ) {
          debug && console.log(`Using translation '${lng}/${ns}' from cache.`);

          // Get missing keys from factory translation in case bundle
          // has had new translations added after cache was created.
          const completeTranslation: I18nTranslation = {
            ...resourceTranslation,
            ...cacheResponse.translation,
          };

          callback(null, completeTranslation);
          return;
        }
      }

      // Check backend

      if (getTranslation) {
        debug && console.log(`Check backend for translation '${lng}/${ns}'...`);

        let translation: I18nTranslation | undefined;
        try {
          translation = await abortHandler.call(signal =>
            getTranslation(lng, ns, { signal }),
          );
        } catch (e) {
          if (e instanceof Abort) {
            callback(e, false);
            return;
          }

          debug &&
            console.error(`Failed to get translation '${lng}/${ns}'.`, e);
        }

        // Use fetched translation

        if (translation) {
          debug &&
            console.log(`Using translation '${lng}/${ns}' from backend.`);

          if (cache) {
            debug &&
              console.log(`Adding translation '${lng}/${ns}' to cache...`);

            try {
              await abortHandler.call(signal =>
                cache.set(lng, ns, translation, { signal }),
              );
            } catch (e) {
              if (e instanceof Abort) {
                callback(e, false);
                return;
              }

              debug &&
                console.error(
                  `Failed to add translation '${lng}/${ns}' to cache.`,
                  e,
                );
            }
          }

          // Get missing keys from factory translation in case bundle
          // has had new translations added after translation file was uploaded.
          const completeTranslation: I18nTranslation = {
            ...resourceTranslation,
            ...translation,
          };

          callback(null, completeTranslation);
          return;
        } else if (cacheResponse) {
          debug && console.log(`Using translation '${lng}/${ns}' from cache.`);

          // Get missing keys from factory translation in case bundle
          // has had new translations added after cache was created.
          const completeTranslation: I18nTranslation = {
            ...resourceTranslation,
            ...cacheResponse.translation,
          };

          callback(null, completeTranslation);
          return;
        }
      }

      // Check resources

      if (resourceTranslation) {
        debug &&
          console.log(
            `Using translation '${lng}/${ns}' from static resources.`,
          );

        callback(null, resourceTranslation);
        return;
      }

      // No translation found

      callback(
        new BackendPluginError(
          `No translation found for '${lng}/${ns}' in any source.`,
        ),
        false,
      );
    },

    abort: () => {
      abortHandler.abort();
    },

    disable: () => {
      abortHandler.abort();
      disabled = true;
    },

    enable: () => {
      disabled = false;
    },

    create: () => {
      // Nothing
    },
  };

  return plugin;
};

export default BackendPlugin;
