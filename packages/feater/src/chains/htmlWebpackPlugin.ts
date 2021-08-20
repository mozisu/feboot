import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Config from 'webpack-chain';
import isPathExist from '../utils/isPathExist';

const CWD = process.cwd();

export default ({ config }: { config: Config }): void => {
  let template = path.join(CWD, './index.html');

  if (!isPathExist(template)) {
    template = path.join(CWD, './src/index.html');
  }

  if (!isPathExist(template)) {
    template = path.join(__dirname, '../../assets/index.html');
  }

  const publicPath = '/';
  const filename = 'index.html';

  config.plugin('html').use(HtmlWebpackPlugin, [
    {
      template,
      filename,
      publicPath,
    },
  ]);
};
