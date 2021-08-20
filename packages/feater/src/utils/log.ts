// import chalk from 'chalk';
import * as colorText from './colorText';
import logSymbols from './logSymbols';

// info: blue
// success: green
// warning: yellow
// error: red

export function logInfo(text: string): void {
  console.log(logSymbols.info, `${colorText.info(text)}`);
}

export function logSuccess(text: string): void {
  console.log(logSymbols.success, colorText.success(text));
}

export function logWarning(text: string): void {
  console.log(logSymbols.warning, colorText.warning(text));
}

export function logError(text: string): void {
  console.log(logSymbols.error, colorText.error(text));
}
