import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/infrastructure/datebase/database.service';
import { CreateAuthDto } from './dto/create-auth.dto';

type OAuthType = {
  email: string;
  name?: string;
  googleId?: string;
  avatar?: string;
  provider: string;
};

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

  async findByGoogleId(googleId: string) {
    return await this.database.user.findUnique({
      where: {
        googleId,
      },
    });
  }

  async createOAuthUser(data: OAuthType) {
    return await this.database.user.create({
      data: {
        email: data.email,
        name: data.name,
        avatar: data.avatar,
        googleId: data.googleId,
        provider: data.provider,
        emailVerified: true,
      },
    });
  }

  async updateUser(userId: string, data: { username?: string; name?: string }) {
    return await this.database.user.update({
      where: { id: userId },
      data,
    });
  }
}
