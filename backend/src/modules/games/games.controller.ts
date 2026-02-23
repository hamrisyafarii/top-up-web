import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import type { BaseQuery } from './entities/base-query.entity';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  findAll(@Query() query: BaseQuery) {
    return this.gamesService.findAll(query);
  }

  @Get(':slug/products')
  findOne(@Param('slug') slug: string) {
    return this.gamesService.findProductsBySlug(slug);
  }

  @Patch(':id')
  update(@Param('id') gameId: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(gameId, updateGameDto);
  }

  @Delete(':id')
  remove(@Param('id') gameId: string) {
    return this.gamesService.remove(gameId);
  }
}
