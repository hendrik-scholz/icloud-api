import { configure, getLogger } from 'log4js';

configure({
  appenders: {
    console: {
      type: 'console',
    },
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'info',
    },
  },
});

const logger = getLogger('icloud-api');

logger.info('Hello icloud-api.');
