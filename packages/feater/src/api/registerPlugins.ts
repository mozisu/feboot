/**
 * registerPlugins
 */

import { logError } from '../utils/log';
import { FeaterConfig, FeaterPlugin } from '../../types';
import Config from 'webpack-chain';
import path from 'path';

interface RegisterPluginsOptions {
  chainConfig: Config;
  featerConfig: FeaterConfig;
}

const CWD = process.cwd();

export default ({
  chainConfig,
  featerConfig,
}: RegisterPluginsOptions): void => {
  if (!Array.isArray(featerConfig.plugins) || featerConfig.plugins.length === 0)
    return;

  // TODO: check package exist
  // TODO: load presets from npm
  // TODO: support load local presets

  featerConfig.plugins.forEach((plugin: FeaterPlugin) => {
    if (typeof plugin === 'string') {
      // console.log(path.join(CWD, 'node_modules', preset));
      require(path.join(CWD, 'node_modules', plugin)).default({
        chainConfig,
      })();
    } else if (Array.isArray(plugin) && plugin.length > 0) {
      require(path.join(CWD, 'node_modules', plugin[0])).default({
        chainConfig,
        presetConfig: plugin[1] || {},
      });
    } else {
      logError('invalid preset config');
    }
  });
};
