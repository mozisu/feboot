import { PluginOptions, PluginFn } from '../types/index.d';

export default ({
  chainConfig,
  presetConfig = {},
}: PluginOptions): PluginFn => {
  return () => {
    const vueRule = chainConfig.module.rule('vue').test(/.vue$/);

    vueRule.use('vue-loader').loader('vue-loader').options(presetConfig);

    chainConfig.plugin('vue-loader').use(require('vue-loader/lib/plugin'));
  };
};
