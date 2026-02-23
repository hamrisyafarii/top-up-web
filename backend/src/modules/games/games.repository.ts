import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/infrastructure/datebase/database.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Prisma } from 'src/generated/prisma/client';
import { queryBuilder } from 'src/common/utils/build-filter.util';
import { BaseQuery } from './entities/base-query.entity';

@Injectable()
export class GameRepository {
  constructor(private readonly database: DatabaseService) {}

  async findMany(query: BaseQuery) {
    const qb = queryBuilder<Prisma.GameWhereInput, Prisma.GameOrderByWithRelationInput>({
      query,
      searchFields: ['title', 'developer'],
    });

    const [data, total] = await Promise.all([
      this.database.game.findMany({
        where: qb.where,
        skip: qb.skip,
        take: qb.take,
        orderBy: qb.orderBy,
      }),
      this.database.game.count({
        where: qb.where,
      }),
    ]);

    return {
      data,
      meta: {
        total,
        page: qb.page,
        lastPage: Math.ceil(total / qb.takeNumber),
      },
    };
  }

  create(createGameDto: CreateGameDto) {
    return this.database.game.create({
      data: createGameDto,
    });
  }

  findProductsByGameSlug(slug: string) {
    return this.database.game.findUnique({
      where: {
        slug,
      },
      include: {
        product: true,
      },
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
