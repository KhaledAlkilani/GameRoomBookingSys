const fs = require('fs');
const path = require('path');

const moveOldCatalogs = (srcDir, dstDir) => {
  if (fs.existsSync(srcDir)) {
    fs.readdirSync(srcDir).forEach(langDirName => {
      const langDirPath = path.join(srcDir, langDirName);

      if (fs.statSync(langDirPath).isDirectory()) {
        fs.readdirSync(langDirPath).forEach(localeFileName => {
          if (localeFileName.endsWith('_old.json')) {
            const srcFilePath = path.join(langDirPath, localeFileName);

            const dstDirPath = path.join(dstDir, langDirName);
            const dstFilePath = path.join(dstDirPath, localeFileName);

            console.log(`Move old translations catalog: ${srcFilePath} >> ${dstFilePath}`);

            if (!fs.existsSync(dstDirPath)) {
              fs.mkdirSync(dstDirPath, { recursive: true });
            }

            fs.renameSync(srcFilePath, dstFilePath);
          }
        });
      }
    });
  }
};

/**
 * Move files ending with "_old.json" from one locale directory to another.
 *
 * The main usage is to swap obsolete locales from
 */
const main = () => {
  const srcDir = process.argv[2];
  const dstDir = process.argv[3];

  moveOldCatalogs(srcDir, dstDir);
};

if (require.main === module) {
  main();
}
