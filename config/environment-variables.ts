import * as dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

export const EnvironmentVariables = {
  bail: parseInt(process.env.BAIL || '0', 10),
  specFileRetries: parseInt(process.env.SPEC_FILE_RETRIES || '0', 10),
  configSpecs: process.env.CONFIG_SPECS || 'failed_to_initialize_CONFIG_SPECS',
  logLevel: process.env.LOG_LEVEL || 'debug',
  waitForTimeout: parseInt(process.env.WAITFOR_TIMEOUT || '0', 10),
  waitForInterval: parseInt(process.env.WAITFOR_INTERVAL || '0', 10),

  databaseHost: process.env.DB_HOST || '',
  datbasePort: parseInt(process.env.DB_PORT || '0', 10),
  databaseUser: process.env.DB_USER || '',
  databasePassword: process.env.DB_PASSWORD || '',

  joinswapp_url: process.env.JOINSWAPP_URL || 'failed_to_initialize_JOINSWAPP_URL'
};
