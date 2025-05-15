import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    example: 'teste@teste.com',
  })
  email!: string;

  @ApiProperty({
    example: 'admin',
  })
  pass!: string;
}
