import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/features/categories/entities/category.entity';

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
        // autoLoadEntities: false,
        synchronize: false,

        entities: [CategoryEntity],

        ssl: {
          rejectUnauthorized: false,
        },

        // migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        // migrationsTableName: 'migrations',
        // migrationsRun: configService.get<string>('NODE_ENV') !== 'production',
        // migrationsRun: false,
      }),
    }),
  ],
})
export class TypeOrmConfigModule {}
