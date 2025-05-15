import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../db/prisma/prisma.service';
import { Usuarios } from '@prisma/client';
import { verifyPassword } from 'src/utils/encriptDecript';
import { AuthDto } from './Dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken(user: Usuarios) {
    return {
      token: await this.JwtService.sign(
        {
          sub: user.idUser,
          name: user.username,
          email: user.email,
        },
        {
          expiresIn: '24h',
        },
      ),
    };
  }

  async verifyToken(token: string) {
    try {
      const authToken = await this.JwtService.verify(token);

      return { token: authToken };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(user: AuthDto) {
    const data = await this.prisma.usuarios.findFirst({
      where: {
        email: user.email,
        active: true,
      },
    });

    if (!data) {
      throw new BadRequestException('User not exist!');
    }

    const pass = await verifyPassword(user.pass, data.password);
    if (pass === false) {
      throw new BadRequestException('Invalid Login!');
    } else {
      return await this.createToken(data);
    }
  }
}
