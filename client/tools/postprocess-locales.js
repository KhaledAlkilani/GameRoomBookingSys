const fs = require('fs');
const path = require('path');
const { EOL } = require('os');

const INTERPOLATION_PREFIX = '{{';
const INTERPOLATION_SUFFIX = '}}';

/**
 * These must be kept in sync with any i18next or Luxon formatter changes!.
 */
const FORMATTER_NAMES = [
  // i18next build-in Intl formatters
  'datetime',
  'relativetime',
  'number',
  'currency',
  'list',

  // Misc. utilities
  'toNumber',
  'toFixed',
  'round',
  'floor',
  'ceil',
  'add',
  'subtract',
  'multiply',
  'divide',
  'boolean',
  'map',
  'substring',
  'lowercase',
  'uppercase',

  // Luxon token formatter
  '$',

  // Luxon presets
  'DATE_SHORT',
  'DATE_MED',
  'DATE_MED_WITH_WEEKDAY',
  'DATE_FULL',
  'DATE_HUGE',
  'TIME_SIMPLE',
  'TIME_WITH_SECONDS',
  'TIME_WITH_SHORT_OFFSET',
  'TIME_WITH_LONG_OFFSET',
  'TIME_24_SIMPLE',
  'TIME_24_WITH_SECONDS',
  'TIME_24_WITH_SHORT_OFFSET',
  'TIME_24_WITH_LONG_OFFSET',
  'DATETIME_SHORT',
  'DATETIME_MED',
  'DATETIME_FULL',
  'DATETIME_HUGE',
  'DATETIME_SHORT_WITH_SECONDS',
  'DATETIME_MED_WITH_SECONDS',
  'DATETIME_FULL_WITH_SECONDS',
  'DATETIME_HUGE_WITH_SECONDS',

  // Legacy aliases
  '$DATE',
  '$DATETIME',
  '$DATETIME_WITH_SECONDS',
  '$TIME',
  '$TIME_WITH_SECONDS',
];

const lowercaseFormatterNames = FORMATTER_NAMES.map(n => n.toLowerCase());

const sortKey = (key1, key2) => {
  return key1.localeCompare(key2, 'en');
};

/**
 * @param {string} pathname
 */
const fixEntry = pathname => {
  const stats = fs.statSync(pathname);
  if (stats.isFile()) {
    if (
      pathname.toLowerCase().endsWith('.json') &&
      !pathname.toLowerCase().endsWith('_old.json')
    ) {
      fixFile(pathname);
    }
  } else if (stats.isDirectory()) {
    fs.readdirSync(pathname).forEach(filename =>
      fixEntry(path.join(pathname, filename)),
    );
  }
};

/**
 * @param {string} filepath
 */
const fixFile = filepath => {
  try {
    console.log(`Postprocess file: ${filepath}`);

    const content = fs.readFileSync(filepath);
    const data = JSON.parse(content);

    // Check that is supported translations file format
    // Record<string, string>
    if (
      Object.values(data).find(value => typeof value !== 'string') !== undefined
    ) {
      console.log(`Skip unsupported JSON file: ${filepath}`);
      return;
    }

    const newData = {};

    for (const key of Object.keys(data).sort(sortKey)) {
      // Remove keys with only interpolation placeholder
      // e.g. "{{value, datetime}}"
      if (
        key.trim().startsWith(INTERPOLATION_PREFIX) &&
        key.trim().endsWith(INTERPOLATION_SUFFIX) &&
        key
          .trim()
          .indexOf(INTERPOLATION_PREFIX, INTERPOLATION_PREFIX.length) === -1
      ) {
        console.log(`Remove placeholder key: ${key}`);
        continue;
      }

      // Remove formatter shorthand keys
      // Compare in lower case since that's how i18next does it
      // https://github.com/i18next/i18next/blob/master/src/Formatter.js

      if (/^\$[^$]/.test(key)) {
        const firstName = key.split(/[(,]/)[0].trim().toLowerCase();

        if (
          lowercaseFormatterNames.includes(firstName) ||
          lowercaseFormatterNames.includes(firstName.substring(1))
        ) {
          console.log(`Remove formatter key: ${key}`);
          continue;
        }
      }

      newData[key] = data[key];
    }

    // Use platform-specific end-of-line sequence since that is git default
    const result = JSON.stringify(newData, null, 2).replace(/\n/g, EOL) + EOL;

    if (result !== content.toString()) {
      fs.writeFileSync(filepath, result);
    }
  } catch (e) {
    console.error(`Failed to process locale file: ${filepath}`, e);
  }
};

/**
 * Locale JSON fixer
 */
const main = () => {
  const paths = process.argv.slice(2);

  if (paths.length === 0) {
    console.error('Missing locale directory');
    process.exit(1);
  }

  paths.forEach(fixEntry);
};

if (require.main === module) {
  main();
}
