import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameRepository } from './games.repository';
import { ApiResponse } from 'src/common/interfaces/response.interfce';
import { GameEntity } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepo: GameRepository) {}

  async create(createGameDto: CreateGameDto): Promise<ApiResponse<GameEntity>> {
    const game = await this.gamesRepo.create(createGameDto);

    return {
      statusCode: 201,
      message: 'Successfully create new game',
      data: game,
    };
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

  async update(gameId: string, updateGameDto: UpdateGameDto): Promise<ApiResponse<GameEntity>> {
    const exsitsGame = await this.gamesRepo.findGameById(gameId);

    if (!exsitsGame) {
      throw new BadRequestException('Game does not exists');
    }

    const gameUpdated = await this.gamesRepo.update(gameId, updateGameDto);

    return {
      statusCode: 200,
      message: `Successfully updated game ${exsitsGame.title}`,
      data: gameUpdated,
    };
  }

  async remove(gameId: string): Promise<ApiResponse<GameEntity>> {
    const exsitsGame = await this.gamesRepo.findGameById(gameId);

    if (!exsitsGame) {
      throw new BadRequestException('Game does not exists');
    }

    await this.gamesRepo.delete(gameId);

    return {
      statusCode: 200,
      message: `Successfully deleted game ${exsitsGame.title}`,
    };
  }
}
