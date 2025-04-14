const { exec } = require('child_process');

function runTranslationCommands(projectName) {
  console.log(`Running translations for project: ${projectName}`);

  const cmd = [
    `cd .`,
    `"./node_modules/.bin/i18next" --config libs/i18n/tools/i18next-parser.english-defaults.config.js ./apps/${projectName} './apps/${projectName}/src/**/*.{js,jsx,ts,tsx}'`,
    `"./node_modules/.bin/i18next" --config libs/i18n/tools/i18next-parser.config.js ./apps/${projectName} './apps/${projectName}/src/**/*.{js,jsx,ts,tsx}'`,
    `node libs/i18n/tools/move-old-translations.js ./apps/${projectName}/old-translations ./apps/${projectName}/public/locales`,
    `node libs/i18n/tools/postprocess-locales.js ./apps/${projectName}/public/locales`,
    `node libs/i18n/tools/postprocess-default-locales.js ./apps/${projectName}/public/locales/en`,
    `node libs/i18n/tools/move-old-translations.js ./apps/${projectName}/public/locales ./apps/${projectName}/old-translations`,
  ].join(' && ');

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`output: ${stdout}`);
  });
}

const main = () => {
  const projectName = process.argv[2];

  if (!projectName) {
    console.log('Please provide a project name.');
    process.exit(1);
  }

  runTranslationCommands(projectName);
};

if (require.main === module) {
  main();
}
