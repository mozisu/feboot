import { CliOptions } from './../../types/index.d';
import startCommandHandler from '../scripts/start';

export default function startCommand({
  program,
  featerConfig,
}: CliOptions): void {
  program
    .command('start')
    .description('start project')
    .action(() => {
      startCommandHandler(featerConfig);
    });
}
