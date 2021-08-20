import chalk from 'chalk';

// info: blue
// success: green
// warning: yellow
// error: red
export function info(text: string): string {
  return chalk.blue(text);
}

export function success(text: string): string {
  return chalk.green(text);
}

export function warning(text: string): string {
  return chalk.yellow(text);
}

export function error(text: string): string {
  return chalk.red(text);
}
