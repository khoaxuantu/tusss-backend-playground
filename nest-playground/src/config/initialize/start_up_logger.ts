import { ConsoleLogger } from '@nestjs/common';

export class StartupLogger extends ConsoleLogger {
  static contextsToIgnore = ['InstanceLoader', 'RoutesResolver', 'RouterExplorer'];

  log(message: any, context?: string) {
    if (!StartupLogger.contextsToIgnore.includes(context)) {
      super.log.apply(this, arguments);
    }
  }
}
