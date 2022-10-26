import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Article, ArticleTag, ArticleTranslate } from 'src/features';

import 'dotenv/config';

const entities = [Article, ArticleTag, ArticleTranslate];
class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    if (process.env.NODE_ENV === 'dev') {
      return {
        type: 'postgres',
        database: process.env.DATABASE_DB,
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        synchronize: true,
        logging: false,
        entities: [...entities],
      };
    }
  }
}

const ensureDevValues = ['DATABASE_HOST', 'DATABASE_PORT', 'DATABASE_USER', 'DATABASE_DB'];
const configDeployService = new ConfigService(process.env).ensureValues(ensureDevValues);

export { configDeployService as configService };
