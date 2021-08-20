import { Pkg } from './../types/index.d';
import checkNodeVersion from './utils/checkNodeVersion';
import registerCommands from './api/registerCommands';

export default (pkg: Pkg): void => {
  checkNodeVersion();
  registerCommands({ pkg });
};
