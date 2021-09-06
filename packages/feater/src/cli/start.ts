import { CliOptions, DefaultPlugins } from './../../types/index.d';
import startCommandHandler from '../scripts/start';

export default function startCommand({
  program,
  featerConfig,
}: CliOptions): void {
  program
    .command('start [entryName]')
    .description('start project')
    .option('--react', 'use react plugin')
    .option('--vue [Vue Version]', 'use vue plugin')
    .action((entry, options) => {
      if (entry) {
        Object.assign(featerConfig, { entry });
      }

      const defaultPlugins: DefaultPlugins = {};

      if (typeof options.react !== 'undefined') defaultPlugins.react = -1;
      if (typeof options.vue !== 'undefined')
        defaultPlugins.vue = options.vue || 2;

      startCommandHandler(featerConfig, defaultPlugins);
    });
}
