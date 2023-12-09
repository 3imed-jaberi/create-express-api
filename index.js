#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('node:path');

(() => {
  const args = process.argv.slice(2);

  if (args.length > 1)
    throw new Error('[@3imed-jaberi/new-express-api]: unexpected options are passed.');

  const hasTargetPathOption = args.length === 1;
  const targetHost = hasTargetPathOption ? path.resolve(process.cwd(), args.at(0)) : process.cwd();
  if (!hasTargetPathOption)
    console.warn(
      '[@3imed-jaberi/new-express-api]: no option passed, which mean the generated code will be at the current level.',
    );

  const sourceHost = path.resolve(__dirname, 'template');
  fs.copySync(sourceHost, targetHost);

  console.info('[@3imed-jaberi/new-express-api]: done ✅!');
})();
