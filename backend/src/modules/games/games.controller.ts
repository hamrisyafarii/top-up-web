import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  findAll() {
    return this.gamesService.findAll();
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
