import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const configuration = (configFile: string) => {
  return yaml.load(readFileSync(join(__dirname, configFile), 'utf-8')) as Record<string, any>;
}

export default configuration;
