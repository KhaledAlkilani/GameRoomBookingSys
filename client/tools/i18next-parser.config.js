// i18next-parser.config.js in Client/tools

const path = require("path");

// Define your available locales directly in code:
const locales = ["en", "fi", "ar"];

console.log("Found locales:", locales);

module.exports = {
  verbose: false,
  // These must match your i18next config!
  locales,
  defaultNamespace: "common",
  keySeparator: false,
  namespaceSeparator: false,
  contextSeparator: "_",
  lexers: {
    js: ["JavascriptLexer"],
    ts: ["JavascriptLexer"],
    jsx: ["JsxLexer"],
    tsx: ["JsxLexer"],
    default: ["JavascriptLexer"],
  },
  // Output path relative to project structure
  output: path.join(__dirname, "../public/locales/$LOCALE/$NAMESPACE.json"),
  defaultValue: "_NOT_TRANSLATED_",
  indentation: 2,
  sort: true,
  lineEnding: "auto",
  createOldCatalogs: true,
};
