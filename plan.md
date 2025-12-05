## Entitties

```
Table categories {
  id uuid [primary key, default: `uuidv4()`]
  name varchar(32) [unique, not null]
  description varchar(256) [null]
  isActive bool [default: true]

  create_at timestampz
  update_at timestampz
}

Table products {
  id uuid [primary key, default: `uuidv4()`]
  name varchar(32) [unique, not null]
  description varchar(256) [null]

  category_id uuid [not null, ref: > categories.id]

  create_at timestampz
  update_at timestampz
}
```

## Configuration

### data-source.ts

```ts
export const dataSourceOptions: DataSourceOptions = {
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
```

### typeorm.config.ts

```ts
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],

      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('POSTGRES_HOST'),
        port: configService.getOrThrow<number>('POSTGRES_PORT'),
        username: configService.getOrThrow<string>('POSTGRES_USER'),
        password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
        database: configService.getOrThrow<string>('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: false,
        entities: [...Object.values(allEntities)],

        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        migrationsTableName: 'migrations',
        // migrationsRun: configService.get<string>('NODE_ENV') !== 'production',
        migrationsRun: false,
      }),

      inject: [ConfigService],
    }),
  ],
})
```

### package.json

```json
{
  "typeorm": "pnpm exec typeorm-ts-node-commonjs",
  "migration:generate": "pnpm typeorm migration:generate -d src/data-source.ts",
  "migration:create": "pnpm typeorm migration:create",
  "migration:run": "pnpm typeorm migration:run -d src/data-source.ts",
  "migration:revert": "pnpm typeorm migration:revert -d src/data-source.ts",
  "migration:show": "pnpm typeorm migration:show -d src/data-source.ts"
}
```

### .env.example

```
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_DB=
```
