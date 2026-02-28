import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthRepository } from './auth.repository';
import bcrypt from 'bcrypt';
import { Auth, AuthResponse } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse } from 'src/common/interfaces/response.interfce';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepo: AuthRepository,
  ) {}

  async register(createAuthDto: CreateAuthDto): Promise<ApiResponse<AuthResponse>> {
    const existsUsername = await this.authRepo.findByUsername(createAuthDto.username);
    if (existsUsername) {
      throw new ConflictException('Username is already used');
    }

    const existsUser = await this.authRepo.findUserByEmail(createAuthDto.email);
    if (existsUser) {
      throw new ConflictException('Email is already used');
    }

    const hashadPassword = await bcrypt.hash(createAuthDto.password, 10);

    const newUser = await this.authRepo.create({
      ...createAuthDto,
      password: hashadPassword,
    });

    const accessToken = this.generateToken(newUser.id, newUser.email);

    const userRespoonse: Auth = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username ?? '',
      name: newUser.name ?? '',
    };

    return {
      statusCode: 201,
      message: 'Succesffully Registered Account',
      data: {
        accessToken: accessToken,
        user: userRespoonse,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<ApiResponse<AuthResponse>> {
    const user = await this.authRepo.findUserByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password ?? '');
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateToken(user.id, user.email);

    const userResponse: Auth = {
      id: user.id,
      email: user.email,
      username: user.username ?? '',
      name: user.name || undefined,
    };

    return {
      statusCode: 200,
      message: 'Login Successfully',
      data: {
        accessToken,
        user: userResponse,
      },
    };
  }

  async validateOAuthUser(profile: {
    googleId: string;
    email: string;
    name?: string;
    avatar?: string;
    provider: string;
  }) {
    let user = await this.authRepo.findByGoogleId(profile.googleId);

    if (user) {
      return user;
    }

    user = await this.authRepo.findUserByEmail(profile.email);

    if (user) {
      // You can update user with Google ID here if needed
      return user;
    }

    // Create new user
    user = await this.authRepo.createOAuthUser(profile);

    return user;
  }

  async validateUser(userId: string): Promise<Auth | null> {
    const user = await this.authRepo.findUserById(userId);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username || '',
      name: user.name || '',
    };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<ApiResponse<Auth>> {
    if (dto.username) {
      const existingUser = await this.authRepo.findByUsername(dto.username);
      if (existingUser && existingUser.id !== userId) {
        throw new ConflictException('Username is already used');
      }
    }

    const updatedUser = await this.authRepo.updateUser(userId, dto);

    return {
      statusCode: 200,
      message: 'Profile updated successfully',
      data: {
        id: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username ?? '',
        name: updatedUser.name ?? '',
      },
    };
  }

  generateToken(userId: string, email: string): string {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload);
  }
}
