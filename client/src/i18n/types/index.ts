/**
 * Collection of themes. Contains at minimum the `default` theme and `RTL` theme.
 * Optionally may include language-specific themes.
 */
export interface ThemeVariants<T> {
  default: T;
  RTL: T;
  [lng: string]: T;
}

/**
 * Map of backend locales where language code is the key
 */
export interface I18nLocales {
  [language: string]: I18nLocale;
}

/**
 * Backend locale
 */
export interface I18nLocale {
  nativeName: string;
  englishName: string;
  rtl?: boolean;
}

/**
 * Translation resources for multiple
 * languages and their namespaces.
 */
export interface I18nResource {
  [lng: string]: I18nResourceLanguage;
}

/**
 * Namespace translations for single language
 */
export interface I18nResourceLanguage {
  [ns: string]: I18nTranslation;
}

/**
 * Translation from API.
 *
 * This is mostly the same as i18next's `ResourceKey`
 * but it cannot be plain string.
 */
export interface I18nTranslation {
  [key: string]: string;
}

/**
 * Cached item with timestamp of last update
 */
export interface I18nTranslationCacheItem {
  translation: I18nTranslation;
  timestamp: number;
}

/**
 * Cache interface.
 */
export interface I18nTranslationCacheHandler {
  /**
   * Get cache item.
   *
   * @param lng Language
   * @param ns Namespace
   * @param options.signal AbortSignal
   * @returns Object containing data and timestamp. Returns `undefined` if item not found.
   * @throws If something happened while getting cache item.
   */
  get: (
    lng: string,
    ns: string,
    options?: { signal?: AbortSignal }
  ) => Promise<I18nTranslationCacheItem | undefined>;
  /**
   * Set translation in cache
   *
   * @param lng Language
   * @param ns Namespace
   * @param translation I18nTranslation to set or `undefined` to remove
   * @param options.signal AbortSignal
   * @throws If something happened while setting cache item.
   */
  set: (
    lng: string,
    ns: string,
    translation: I18nTranslation | undefined,
    options?: { signal?: AbortSignal }
  ) => Promise<void>;
}
