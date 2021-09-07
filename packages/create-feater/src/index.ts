import minimist from 'minimist';
import { resolvePath } from './utils/pathResolver';
import printHelpInfo from './utils/printHelpInfo';
import printVersion from './utils/printVersion';

// options:
// --template
// --help
// --version

const argv = minimist(process.argv.slice(2), {
  alias: {
    template: 'tpl',
    help: ['h', 'H'],
    version: ['v', 'V'],
  },
});

function parseArgs(argv: minimist.ParsedArgs) {
  if (argv.help) {
    printHelpInfo();
    process.exit(0);
  }

  if (argv.version) {
    printVersion();
    process.exit(0);
  }

  let dir = argv._;
  if (!dir.length || ['.', './'].includes(dir[0])) {
    console.log('Are you sure create project in current dir?');
    dir[0] = './';
  }
  const template = argv.template || 'react';

  const args = {
    appPath: resolvePath(dir[0]),
    template,
  };

  console.log(args);
}

// console.log(argv);

parseArgs(argv);
