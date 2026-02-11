import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/infrastructure/datebase/database.service';

@Injectable()
export class GameRepository {
  constructor(private readonly database: DatabaseService) {}

  findMany() {
    return this.database.game.findMany();
  }
}
