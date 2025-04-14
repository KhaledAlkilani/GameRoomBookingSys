const fs = require('fs');
const path = require('path');
const { EOL } = require('os');

const DEFAULT_VALUE = '_NOT_TRANSLATED_';
const SUFFIX_SEPARATOR = '_';

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
    console.log(`Set keys as default values for locale file: ${filepath}`);

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
      let value = data[key];

      // Set key without suffixes as the value
      if (value === DEFAULT_VALUE) {
        value = key.split(SUFFIX_SEPARATOR)[0];
      }

      newData[key] = value;
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
 * Locale default keys fixer
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
