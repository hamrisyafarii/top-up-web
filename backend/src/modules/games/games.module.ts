import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { DatabaseModule } from 'src/infrastructure/datebase/database.module';
import { GameRepository } from './games.repository';

@Module({
  controllers: [GamesController],
  providers: [GamesService, GameRepository],
  imports: [DatabaseModule],
  exports: [GameRepository],
})
export class GamesModule {}
