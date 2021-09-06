/**
 * registerPlugins
 */

import { logError } from '../utils/log';
import { FeaterConfig, FeaterPlugin } from '../../types';
import Config from 'webpack-chain';
import { resolvePlugin } from '../utils/plugin';
import isPathExist from '../utils/isPathExist';

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

  console.log(CWD);

  featerConfig.plugins.forEach((plugin: FeaterPlugin) => {
    const resolvedPlugin = resolvePlugin(plugin);

    console.log('plugin: ', plugin, resolvedPlugin.path);

    if (!isPathExist(resolvedPlugin.path)) {
      logError(`can not find plugin ${resolvedPlugin.name}`);
      process.exit(1);
    }

    require(resolvedPlugin.path).default({
      chainConfig,
      pluginConfig: resolvedPlugin.config,
    })();
  });
};
