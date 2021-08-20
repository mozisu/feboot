import { ChainsConfig } from './../../types/index.d';

export default ({ config }: ChainsConfig): void => {
  config.resolve.extensions
    .merge(['.js', '.json', '.jsx', 'ts', 'tsx', '.vue'])
    .end().alias;
};
