import { Module } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { DatabaseModule } from 'src/infrastructure/datebase/database.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { GamesModule } from '../games/games.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsRepository, ProductsService],
  imports: [DatabaseModule, GamesModule],
})
export class ProductsModule {}
