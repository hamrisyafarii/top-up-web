import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GamesModule } from './modules/games/games.module';
import { DatabaseModule } from './infrastructure/datebase/database.module';

@Module({
  imports: [ConfigModule.forRoot(), GamesModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
