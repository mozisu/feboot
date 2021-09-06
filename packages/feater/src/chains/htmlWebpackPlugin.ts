import path from 'path';
import fs from 'fs';
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

  config.plugin('html-webpack-plugin').use(HtmlWebpackPlugin, [
    {
      // TODO:
      // use tempalte will trigger a bug? with following logic:
      // template = path.join(__dirname, '../../assets/index.html');

      // template,
      templateContent: fs.readFileSync(template, { encoding: 'utf-8' }),
      filename,
      publicPath,
    },
  ]);
};
