import * as dotenv from 'dotenv';
import * as process from 'process';
import * as path from 'node:path';

dotenv.config();

export const Config = {
  Mongo: {
    URI: process.env.MONGO_URI,
    DB: process.env.MONGO_DB,
    USERNAME: process.env.MONGO_USERNAME,
    PASSWORD: process.env.MONGO_PASSWORD,
  },
  Redis: {
    URI: process.env.REDIS_URI,
  },
  Authorization: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION_DAYS: process.env.JWT_EXPIRATION_DAYS || '7',
  },
  UploadsFolder: path.join(process.env.PWD, 'uploads'),
};
