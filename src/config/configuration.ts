import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { NODE_ENV } from './environment';

const configuration = (configFile: string) => {
  return yaml.load(readFileSync(join(__dirname, configFile), 'utf-8')) as Record<string, any>;
}

export const CommonConfiguration = () => configuration(`common/${NODE_ENV}.yaml`);
export const DatabaseConfiguration = () => configuration(`db/${NODE_ENV}.yaml`);
