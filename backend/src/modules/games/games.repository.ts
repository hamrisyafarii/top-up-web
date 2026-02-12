import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/infrastructure/datebase/database.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class GameRepository {
  constructor(private readonly database: DatabaseService) {}

  findMany() {
    return this.database.game.findMany();
  }

  create(createGameDto: CreateGameDto) {
    return this.database.game.create({
      data: createGameDto,
    });
  }

  findGameById(gameId: string) {
    return this.database.game.findUnique({
      where: {
        id: gameId,
      },
    });
  }

  update(gameId: string, updateGameDto: UpdateGameDto) {
    const dataToUpdate: Prisma.GameUpdateInput = {};

    if (updateGameDto.title) {
      dataToUpdate.title = updateGameDto.title;
    }

    if (updateGameDto.developer) {
      dataToUpdate.developer = updateGameDto.developer;
    }

    if (updateGameDto.image) {
      dataToUpdate.image = updateGameDto.image;
    }

    if (updateGameDto.category) {
      dataToUpdate.category = updateGameDto.category;
    }

    if (updateGameDto.popular) {
      dataToUpdate.popular = updateGameDto.popular;
    }

    return this.database.game.update({
      where: {
        id: gameId,
      },
      data: updateGameDto,
    });
  }

  delete(gameId: string) {
    return this.database.game.delete({
      where: {
        id: gameId,
      },
    });
  }
}
