import Config from 'webpack-chain';

export interface PluginOptions {
  chainConfig: Config;
  presetConfig: {
    [key: string]: any;
  };
}

export type PluginFn = () => void;
