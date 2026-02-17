import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/infrastructure/datebase/database.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly database: DatabaseService) {}

  findUserByEmail(email: string) {
    return this.database.user.findUnique({
      where: {
        email,
      },
    });
  }

  findUserById(userId: string) {
    return this.database.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  findByUsername(username: string) {
    return this.database.user.findUnique({
      where: {
        username,
      },
    });
  }

  create(createAuthDto: CreateAuthDto & { password: string }) {
    return this.database.user.create({
      data: createAuthDto,
    });
  }
}
