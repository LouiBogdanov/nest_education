import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigModule } from './config/typeorm.config';
import { CategoryModule } from './features/categories/category.module';
import { ProductModule } from './features/product/product.module';
import { ProfileModule } from './features/profile/profile.module';
import { TagModule } from './features/tag/tag.module';
import { UserModule } from './features/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'aws-1-eu-west-2.pooler.supabase.com',
    //   port: Number(process.env.POSTGRESS_PORT) || 5432,
    //   username: 'postgres.vqiqqqplpinrptykztlt',
    //   password: 'wvH2j94vUpIHlORQ',
    //   database: 'postgres',
    //   autoLoadEntities: true,
    //   synchronize: true,
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    // }),

    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: 'aws-1-eu-west-2.pooler.supabase.com',
    //     port: 6543,
    //     username: 'postgres.vqiqqqplpinrptykztlt',
    //     password: 'wvH2j94vUpIHlORQ',
    //     database: configService.getOrThrow<string>('POSTGRES_DB'),
    //     autoLoadEntities: true,
    //     synchronize: true,
    //     ssl: {
    //       rejectUnauthorized: false,
    //     },
    //   }),
    // }),

    TypeOrmConfigModule,

    CategoryModule,

    // UserModule,

    // ProfileModule,

    // ProductModule,

    // TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
