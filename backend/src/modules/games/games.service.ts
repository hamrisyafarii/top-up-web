import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameRepository } from './games.repository';
import { ApiResponse } from 'src/common/interfaces/response.interfce';
import { GameEntity } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepo: GameRepository) {}

  create(createGameDto: CreateGameDto) {
    return 'This action adds a new game';
  }

  async findAll(): Promise<ApiResponse<GameEntity[]>> {
    const games = await this.gamesRepo.findMany();

    return {
      statusCode: 200,
      message: 'Success get all games',
      data: games,
    };
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
