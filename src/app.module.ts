import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsModule } from './features/documents/documents.module';
import { LagersModule } from './features/lagers/lagers.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [DocumentsModule, LagersModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
