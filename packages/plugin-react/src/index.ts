import { PluginOptions, PluginFn } from '../types/index.d';
import Config from 'webpack-chain';

export default ({
  chainConfig,
  presetConfig = {},
}: PluginOptions): PluginFn => {
  return () => {
    const babelRule = chainConfig.module.rule('babel').test(/.(j|t)sx?/);

    babelRule
      .use('babel-loader')
      .loader('babel-loader')
      .tap((options: Config.LoaderOptions) => {
        options.presets.push(['@babel/preset-react', presetConfig]);
        return options;
      });
  };
};
