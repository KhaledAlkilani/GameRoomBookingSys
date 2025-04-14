// i18next-parser.config.js
const config = require("./i18next-parser.config.js");
// Produces only English locale using keys as values for new keys

module.exports = {
  ...config,
  locales: ["fi"],
  useKeysAsDefaultValue: true,
};
