import { BadGatewayException, Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma/prisma.service';
import { CreateUserDto } from './Dto/createUser.dto';
import { encrypt } from 'src/utils/encriptDecript';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserDto) {
    const consult = await this.prisma.usuarios.findFirst({
      where: {
        email: user.email,
        active: true,
      },
    });
    if (consult) {
      return { message: 'e-mail already exists!' };
    }

    const data = await this.prisma.usuarios.create({
      data: {
        username: user.name,
        email: user.email,
        password: await encrypt(user.pass),
      },
    });

    return { message: 'created!' };
  }
}
