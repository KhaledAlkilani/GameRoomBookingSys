import { i18n as I18n, PostProcessorModule, TOptions } from 'i18next';

/**
 * The existence of these keys in TOptions will be checked in
 * this order of priority. This is in case people make common
 * mistake of typing `date` or `time` instead of `value`.
 */
const placeholderKeys = ['value', 'date', 'time'];

/** Counter for generated names */
let counter = 0;

/**
 * i18next shorthand postprocess plugin.
 *
 * Allows to use plain formatters with `t()` function.
 *
 * Example:
 * ```ts
 * t('$DATETIME', { date });
 * ```
 *
 * @param i18n i18next instance the plugin will be attached to
 * @param name Unique name for plugin instance (optional).
 * @returns i18next PostProcessorModule
 */
const ShorthandPostProcessor = (
  i18n: I18n,
  name?: string,
): PostProcessorModule => ({
  type: 'postProcessor',
  name: name || 'shorthandPostProcessor-' + counter++,
  process: (
    value: string,
    keys: string | string[],
    options: TOptions,
    _translator?: any,
  ) => {
    const formatter = i18n.services.formatter;

    if (formatter !== undefined) {
      try {
        if (!Array.isArray(keys)) {
          keys = [keys];
        }

        for (const key of keys) {
          // Skip keys which start with two $$
          if (!/^\$[^$]/.test(key)) {
            continue;
          }

          let firstName = key.split(/[(,]/)[0].trim().toLowerCase();

          // `formats` property should be available according to
          // https://github.com/i18next/i18next/blob/master/src/Formatter.js

          if ((formatter as any).formats[firstName] === undefined) {
            // Try without `$` prefix
            firstName = firstName.slice(1);

            if ((formatter as any).formats[firstName] === undefined) {
              continue;
            }
          }

          const placeholderKey = placeholderKeys.find(
            k => options[k] !== undefined,
          );

          if (!placeholderKey) {
            console.error(
              `Missing value. Please define 'value', 'date' or 'time' key in TOptions. (key='${key}')`,
            );
            return '[MISSING VALUE]';
          }

          return formatter.format(
            options[placeholderKey],
            key,
            i18n.language,
            options,
          );
        }
      } catch (e) {
        console.error('Failed to run postprocessor', e);
      }
    }

    return value;
  },
});

export default ShorthandPostProcessor;
