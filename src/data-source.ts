import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import * as allEntities from './features/all-entities';

void config({ path: '.env' });

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [...Object.values(allEntities)],
  migrations: [
    process.env.NODE_ENV === 'production'
      ? 'dist/migrations/*.js'
      : 'src/migrations/*.ts',
  ],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
