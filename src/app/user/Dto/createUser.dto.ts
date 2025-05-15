import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Jhon Doe',
  })
  name!: string;

  @ApiProperty({
    example: 'teste@teste.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'admin',
  })
  @MinLength(6)
  pass!: string;
}
