import Config from 'webpack-chain';

export default ({ config }: { config: Config }): void => {
  const babelRule = config.module.rule('babel').test(/.(j|t)s$/);

  const babelConfig = {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: {
            browsers: [
              '> 1%',
              'last 10 versions',
              'not ie <= 8',
              'iOS >= 8',
              'Android >= 4.1',
            ],
          },
          useBuiltIns: 'usage',
          corejs: 3,
        },
      ],
    ],
  };

  babelRule.exclude
    .add(/node_modules/)
    .end()
    .use('babel-loader')
    .loader('babel-loader')
    .options(babelConfig);
};
