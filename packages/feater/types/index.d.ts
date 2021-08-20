import commander from 'commander';
import Config from 'webpack-chain';
import WebpackDevServer from 'webpack-dev-server';

export interface AnyObj {
  [key: string]: any;
}

export interface Pkg {
  name: string;
  version: string;
  [key: string]: any;
}

export interface CliOptions {
  program: commander.Command;
  scriptFn?: (config: FeaterConfig) => void;
  featerConfig: FeaterConfig;
}

export interface RegisterCommandOptions {
  pkg: Pkg;
}

export type FeaterPlugin = string | [string, AnyObj];

// for feater.config.js
export interface FeaterConfig {
  // base config
  entry?: string;
  base?: string;
  outputPath?: string;
  publicPath?: string;
  hash?: boolean;

  // @: src
  alias: AnyObj;

  // for devServer
  port?: number;
  open?: boolean;
  proxy?: WebpackDevServer.ProxyConfigMap;

  css?: {
    autoprefixer?: AnyObj;
    cssLoader?: AnyObj;
    lessLoader?: AnyObj;
    stylusLoader?: AnyObj;
    sassLoader?: AnyObj;
    cssnano?: AnyObj;
    postcssLoader?: AnyObj;
  };
  // 浏览器兼容配置，自动引入 polyfill
  targets?: AnyObj;
  analyze?: boolean;
  chunks?: string[];

  // extend webpack config
  chainWebpack?: (config: Config) => void;

  // plugins
  plugins?: FeaterPlugin[];
}

export interface ChainsConfig {
  config: Config;
  featerConfig: FeaterConfig;
}
