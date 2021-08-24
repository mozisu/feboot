import fs from 'fs';
import path from 'path';
import minimist from 'minimist';

// args:
// --template

const argv = minimist(process.argv.slice(2));
const cwd = process.cwd();

function parseArgs(argv: minimist.ParsedArgs) {
  let dir = argv._;
  if (!dir.length || ['.', './'].includes(dir[0])) {
    console.log('Are you sure create project in current dir?');
    dir[0] = cwd;
  }
  const template = argv.tempalte || 'react';

  const args = {
    appPath: dir[0],
    template,
  };

  console.log(args);
}

console.log(argv);

parseArgs(argv);
