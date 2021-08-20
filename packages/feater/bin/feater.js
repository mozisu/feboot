#!/usr/bin/env node
const pkg = require('../package.json');
require('../dist/index').default(pkg);
