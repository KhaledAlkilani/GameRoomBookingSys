import { i18n as I18n } from "i18next";
import { DateTime } from "luxon";

// Note: Update formatter names also in tools/postprocess-locales.js

const presets: Record<string, any> = {
  // Primary presets

  $DATE: {
    dateStyle: "short",
  },
  $DATETIME: {
    dateStyle: "short",
    timeStyle: "short",
  },
  $DATETIME_WITH_SECONDS: {
    dateStyle: "short",
    timeStyle: "medium",
  },
  $TIME: {
    timeStyle: "short",
  },
  $TIME_WITH_SECONDS: {
    timeStyle: "medium",
  },

  // Luxon presets

  DATE_SHORT: DateTime.DATE_SHORT,
  DATE_MED: DateTime.DATE_MED,
  DATE_MED_WITH_WEEKDAY: DateTime.DATE_MED_WITH_WEEKDAY,
  DATE_FULL: DateTime.DATE_FULL,
  DATE_HUGE: DateTime.DATE_HUGE,
  TIME_SIMPLE: DateTime.TIME_SIMPLE,
  TIME_WITH_SECONDS: DateTime.TIME_WITH_SECONDS,
  TIME_WITH_SHORT_OFFSET: DateTime.TIME_WITH_SHORT_OFFSET,
  TIME_WITH_LONG_OFFSET: DateTime.TIME_WITH_LONG_OFFSET,
  TIME_24_SIMPLE: DateTime.TIME_24_SIMPLE,
  TIME_24_WITH_SECONDS: DateTime.TIME_24_WITH_SECONDS,
  TIME_24_WITH_SHORT_OFFSET: DateTime.TIME_24_WITH_SHORT_OFFSET,
  TIME_24_WITH_LONG_OFFSET: DateTime.TIME_24_WITH_LONG_OFFSET,
  DATETIME_SHORT: DateTime.DATETIME_SHORT,
  DATETIME_MED: DateTime.DATETIME_MED,
  DATETIME_FULL: DateTime.DATETIME_FULL,
  DATETIME_HUGE: DateTime.DATETIME_HUGE,
  DATETIME_SHORT_WITH_SECONDS: DateTime.DATETIME_SHORT_WITH_SECONDS,
  DATETIME_MED_WITH_SECONDS: DateTime.DATETIME_MED_WITH_SECONDS,
  DATETIME_FULL_WITH_SECONDS: DateTime.DATETIME_FULL_WITH_SECONDS,
  DATETIME_HUGE_WITH_SECONDS: DateTime.DATETIME_HUGE_WITH_SECONDS,
};

/**
 * Add some convenience formatters to i18n instance.
 *
 * Note: Should be called after `init()` was called.
 *
 * @param i18n i18next instance to assign formatters to.
 * @returns Input i18next instance
 */
export const addFormatters = (i18n: I18n) => {
  // https://github.com/i18next/i18next/blob/master/src/Formatter.js

  const { formatter } = i18n.services;

  if (!formatter) {
    console.error(
      "Cannot add formatters to i18next instance because services.formatter not found."
    );
    return;
  }

  // Add Luxon presets as formatters

  Object.keys(presets).forEach((key) => {
    formatter.add(key, (value, lng, options) => {
      try {
        const {
          timeZone,
          zone,
          locale,
          lng: language,
          ...formatOptions
        } = options as Record<string, any>;

        return DateTime.fromJSDate(new Date(value))
          .setLocale(locale || language || lng)
          .setZone(timeZone || zone || "local")
          .toLocaleString({
            ...presets[key],
            ...formatOptions,
          });
      } catch (e) {
        console.error("Failed to format preset", e);
        return "[PRESET ERROR]";
      }
    });
  });

  // Add '$' formatter for Luxon tokens

  formatter.add("$", (value, lng, options) => {
    try {
      const {
        token = getPositionalArgument(options),
        timeZone,
        zone,
        locale,
        lng: language,
        ...formatOptions
      } = options as Record<string, any>;

      if (token === undefined) {
        return "[MISSING TOKEN]";
      }

      return DateTime.fromJSDate(new Date(value))
        .setLocale(locale || language || lng)
        .setZone(timeZone || zone || "local")
        .toFormat(token, formatOptions);
    } catch (e) {
      console.error("Failed to format token", e);
      return "[FORMAT ERROR]";
    }
  });

  // Add utility formatters

  // toDate
  // toDate(fallback: 2022-10-18 12:34:56.789)
  // toDate(2022-10-18 12:34:56.789)
  formatter.add("toDate", (value, _, options) => {
    value = new Date(value);
    if (Number.isNaN(value.getTime())) {
      const { fallback = getPositionalArgument(options) } = options;
      return new Date(fallback);
    }
    return value;
  });

  // toNumber
  // toNumber(fallback: 0)
  // toNumber(0)
  formatter.add("toNumber", (value, _, options) => {
    value = Number(value);
    if (Number.isNaN(value)) {
      const { fallback = getPositionalArgument(options) } = options;
      return Number(fallback);
    }
    return value;
  });

  // toFixed(fractionDigits: 2)
  // toFixed(2)
  formatter.add("toFixed", (value, _, options) => {
    const { fractionDigits = getPositionalArgument(options, 0, 0) } = options;
    return Number(value).toFixed(Number(fractionDigits));
  });

  // round
  formatter.add("round", (value): any => {
    return Math.round(Number(value));
  });

  // floor
  formatter.add("floor", (value): any => {
    return Math.floor(Number(value));
  });

  // ceil
  formatter.add("ceil", (value): any => {
    return Math.ceil(Number(value));
  });

  // add(amount: 12.3)
  // add(12.3)
  formatter.add("add", (value, _, options): any => {
    const { amount = getPositionalArgument(options) } = options;
    if (amount === undefined) {
      throw new Error('"add" formatter is missing amount.');
    }
    return Number(value) + Number(amount);
  });

  // subtract(amount: 7.5)
  // subtract(7.5)
  formatter.add("subtract", (value, _, options): any => {
    const { amount = getPositionalArgument(options) } = options;
    if (amount === undefined) {
      throw new Error('"subtract" formatter is missing amount.');
    }
    return Number(value) - Number(amount);
  });

  // multiply(multiplier: 1.5)
  // multiply(1.5)
  formatter.add("multiply", (value, _, options): any => {
    const { multiplier = getPositionalArgument(options) } = options;
    if (multiplier === undefined) {
      throw new Error('"multiply" formatter is missing value.');
    }
    return Number(value) * Number(multiplier);
  });

  // divide(divider: 2)
  // divide(2)
  formatter.add("divide", (value, _, options): any => {
    const { divider = getPositionalArgument(options) } = options;
    if (divider === undefined) {
      throw new Error('"divide" formatter is missing value.');
    }
    if (divider === 0) {
      throw new Error('"divide" formatter has division by zero.');
    }
    return Number(value) / Number(divider);
  });

  // boolean
  // boolean(true: Yes; false: No)
  // boolean(true: Yes; false: No; true[fi]: Kyllä; false[fi]: Ei)
  formatter.add("boolean", (value, lng, options) => {
    const falsyValues = ["false", "0", "", "no", "off", "disabled"];

    const isTrue =
      typeof value === "string"
        ? !falsyValues.includes(value.toLowerCase())
        : !!value;

    const key = isTrue ? "true" : "false";

    const result = resolveLocalizedOption(key, lng, options);

    if (result === undefined) {
      throw new Error('"boolean" formatter could not resolve label.');
    }

    return result;
  });

  // map(key: value, key2: value2)
  formatter.add("map", (value, lng, options) => {
    const result = resolveLocalizedOption(value + "", lng, options);

    if (result !== undefined) {
      return result;
    }

    if (options["@default"] !== undefined) {
      return options["@default"];
    }

    return value;
  });

  // substring(start: 0; end: 2)
  // substring(0; 2)
  formatter.add("substring", (value, _, options) => {
    const str: string = value + "";
    let start: number;
    let end: number;

    if (options.start === undefined && options.end === undefined) {
      start = Number(getPositionalArgument(options, 0));
      end = Number(getPositionalArgument(options, 1));
    } else {
      start = Number(options.start);
      end = Number(options.end);
    }

    if (Number.isNaN(start)) {
      start = 0;
    }
    if (Number.isNaN(end)) {
      end = str.length;
    }

    return str.substring(start, end);
  });

  // lowercase
  formatter.add("lowercase", (value, lng) => {
    try {
      return (value + "").toLocaleLowerCase(lng);
    } catch (e) {
      console.error("Failed to format lowercase", e);
      return (value + "").toLowerCase();
    }
  });

  // uppercase
  formatter.add("uppercase", (value, lng) => {
    try {
      return (value + "").toLocaleUpperCase(lng);
    } catch (e) {
      console.error("Failed to format uppercase", e);
      return (value + "").toUpperCase();
    }
  });

  // LEGACY: Support simple numeral.js formats for fraction digits.
  // e.g. '0', '0.0', '0.00', '0.000' etc.

  // for (let i = 0; i < 10; i++) {
  //   const name = Number(0).toFixed(i);

  //   formatter.add(name, value => {
  //     console.warn(
  //       `DEPRECATION WARNING: Using numeral.js format "${name}". Please use "toFixed(${i})" instead.`,
  //     );
  //     return Number(value).toFixed(i);
  //   });
  // }

  // Add convenience option to `number` formatter
  // to set both fraction digit values in one go.

  // This property should be exposed according to
  // https://github.com/i18next/i18next/blob/master/src/Formatter.js
  const { formats } = formatter as any;
  const numberFormat = formats && formats.number;

  if (numberFormat) {
    formatter.add("number", (value, lng, options) => {
      try {
        const { fractionDigits, ...other } = options;

        if (fractionDigits !== undefined) {
          options = {
            minimumFractionDigits: fractionDigits,
            maximumFractionDigits: fractionDigits,
            ...other,
          };
        }
      } catch (e) {
        console.error("Failed to extract `fractionDigits` options.");
      }
      return numberFormat(value, lng, options);
    });
  } else {
    console.error("Could not add `fractionDigits` option support.");
  }
};

/**
 * Hacky helper function to resolve positional
 * arguments in format options.
 *
 * Currently, it assumes keys with value `NaN`
 * can be regarded as positional arguments.
 *
 * @param options Format options
 * @param index Index of the argument
 * @param fallback Value to return if not found
 * @returns Key of argument with value `NaN`
 */
const getPositionalArgument = (
  options: Record<string, any>,
  index = 0,
  fallback?: any
) => {
  for (const key of Object.keys(options)) {
    if (Number.isNaN(options[key])) {
      if (index <= 0) {
        return key;
      }
      index--;
    }
  }
  return fallback;
};

/**
 * Helper function to resolve localized values from options
 *
 * e.g. `key`, `key[en-GB]`
 *
 * @param key Default key and key prefix to search
 * @param lng Current language
 * @param options Object to search values from
 * @param skipShortLng Do not check short language prefix
 */
const resolveLocalizedOption = (
  key: string,
  lng: string | undefined,
  options: Record<string, any>,
  skipShortLng = false
) => {
  if (lng) {
    let result = options[key + "[" + lng + "]"];

    if (result === undefined && !skipShortLng) {
      result = options[key + "[" + lng.split(/[-_]/) + "]"];
    }

    if (result !== undefined) {
      return result;
    }
  }

  return options[key];
};
