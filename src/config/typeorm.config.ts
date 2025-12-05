import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as allEntities from '../features/all-entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('POSTGRES_HOST'),
        port: configService.getOrThrow<number>('POSTGRES_PORT'),
        password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
        username: configService.getOrThrow<string>('POSTGRES_USER'),
        database: configService.getOrThrow<string>('POSTGRES_DB'),
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [...Object.values(allEntities)],
        synchronize: false,
        migrations: ['dist/migrations/*.js'],
        // migrations: [
        //   process.env.NODE_ENV === 'production'
        //     ? 'dist/migrations/*.js'
        //     : 'src/migrations/*.ts',
        // ],
        migrationsTableName: 'typeorm_migrations',
        migrationsRun: false,
        // autoLoadEntities: false,
      }),
    }),
  ],
})
export class TypeOrmConfigModule {}
