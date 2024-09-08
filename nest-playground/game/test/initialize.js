import * as mongoose from 'mongoose';
import { CustomConsole, LogType, LogMessage } from '@jest/console';

function simpleFormatter(type, message) {
  const TITLE_INDENT = '    ';
  const consoleIndent = (index) =>
    index == 0 ? `[${new Date().toISOString()}]` : '                          ';

  return (
    message
      .split(/\n/)
      .map((line, index) => consoleIndent(index) + TITLE_INDENT + line)
      .join('\n') + '\n'
  );
}

global.console = new CustomConsole(process.stdout, process.stderr, simpleFormatter);

mongoose.set('debug', true);
