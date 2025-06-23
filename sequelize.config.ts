// sequelize.config.ts
import { Dialect } from 'sequelize';
import { SequelizeOptions } from 'sequelize-typescript';
import * as dotenv from 'dotenv';

dotenv.config();

const config: { [key: string]: SequelizeOptions } = {
    development: {
        dialect: 'sqlite' as Dialect,
        storage: './database.sqlite',
        models: [__dirname + 'src/**/*.entity.ts'],
    },
};

export default config;