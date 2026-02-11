import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameRepository } from './games.repository';

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepo: GameRepository) {}

  create(createGameDto: CreateGameDto) {
    return 'This action adds a new game';
  }

  async findAll() {
    return await this.gamesRepo.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
