/**
 * registerPlugins
 */

import { logError } from '../utils/log';
import { FeaterConfig, FeaterPlugin } from '../../types';
import Config from 'webpack-chain';
import path from 'path';
import { resolvePlugin } from '../utils/plugin';

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
    const reolvedPlugin = resolvePlugin(plugin);

    console.log('plugin: ', plugin, reolvedPlugin);

    require(reolvedPlugin.path).default({
      chainConfig,
      pluginConfig: reolvedPlugin.config,
    })();
  });
};
