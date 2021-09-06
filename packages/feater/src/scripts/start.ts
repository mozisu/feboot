import { DefaultPlugins } from './../../types/index.d';
import { FeaterConfig } from '../../types/index.d';
import Config from 'webpack-chain';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { isFunction } from '../utils/checkType';
import chalk from 'chalk';
import getIPAddress from '../utils/getIPAddress';

import alias from '../chains/alias';
import babelLoader from '../chains/babelLoader';
import htmlWebpackPlugin from '../chains/htmlWebpackPlugin';
import cssLoaders from '../chains/cssLoaders';

import { logError } from '../utils/log';
import registerPlugins from '../api/registerPlugins';
import {
  resolveEntry,
  resolveOutputPath,
  resolvePublicPath,
} from '../utils/pathResolver';

export default (
  featerConfig: FeaterConfig,
  defaultPlugins?: DefaultPlugins
): void => {
  const config = new Config();
  const { port = 3000, open = false, chainWebpack, proxy = {} } = featerConfig;

  // ----- base start
  const name = 'main';
  const base = featerConfig.base || '/';
  const entry = resolveEntry(featerConfig.entry);
  const outputDir = resolveOutputPath(featerConfig.outputDir);
  const publicPath = resolvePublicPath(featerConfig.publicPath);

  config
    .entry(name)
    .add(entry)
    .end()
    .cache({
      type: 'filesystem',
    })
    .set('mode', 'development')
    .output.path(outputDir)
    .filename(
      `js/${featerConfig.hash ? '[name].[hash:8]' : '[name]'}.bundle.js`
    )
    .publicPath(publicPath);

  config.devtool('cheap-source-map');

  config.plugin('error').use('friendly-errors-webpack-plugin');

  // ----- base end

  // only for dev
  config.devServer
    .quiet(true)
    .hot(true)
    .historyApiFallback(true)
    .https(false)
    .disableHostCheck(true)
    .publicPath(base)
    .noInfo(true)
    .quiet(false);

  // chains start
  alias({ config, featerConfig });
  babelLoader({ config });
  cssLoaders({ config, featerConfig });
  htmlWebpackPlugin({ config });
  // chains end

  // default plugins start
  if (defaultPlugins.react || defaultPlugins.vue) {
    featerConfig.plugins = featerConfig.plugins || [];
  }
  defaultPlugins.react && featerConfig.plugins.unshift('@feater/plugin-react');
  defaultPlugins.vue && featerConfig.plugins.unshift('@feater/plugin-vue');
  // default plugins end

  // register presets start
  try {
    registerPlugins({ chainConfig: config, featerConfig });
  } catch (e) {
    logError(e.message);
    process.exit(1);
  }
  // register presets end

  // register plugins start
  // register plugins end

  // for webpack chain extension
  if (isFunction(chainWebpack)) {
    chainWebpack(config);
  }

  const compiler = webpack(config.toConfig());

  // console.log(JSON.stringify(compiler.options.resolve));
  // console.dir(config.toConfig().module);

  const server = new WebpackDevServer(compiler, {
    ...compiler.options.devServer,
    open,
    proxy,
  });

  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => {
      server.close(() => {
        process.exit(0);
      });
    });
  });

  server.listen(port);

  compiler.hooks.done.tap('start', () => {
    const ip = getIPAddress();
    const indent = '    ';
    const addressInfo = `App running at:
      - Local:   http://localhost:${port}${base}
      - Network: http://${ip}:${port}${base}\n`;
    console.log(chalk.cyan(`\n${indent}${addressInfo}`));
  });
};
