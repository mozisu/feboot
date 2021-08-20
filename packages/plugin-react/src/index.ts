import { PluginOptions, PluginFn } from '../types/index.d';
import Config from 'webpack-chain';

export default ({
  chainConfig,
  presetConfig = {},
}: PluginOptions): PluginFn => {
  return () => {
    const babelRule = chainConfig.module.rule('babel');

    babelRule.test(/.(j|t)sx?/);

    babelRule
      .use('babelLoader')
      .loader('babel-loader')
      .tap((options: Config.LoaderOptions) => {
        options.presets.push('@babel/preset-react', presetConfig);
        return options;
      });
  };
};
