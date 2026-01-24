/* eslint-disable indent */
import { IamUpdateUserByIdDto } from '@api/iam/user';
import { ApiProperty } from '@nestjs/swagger';

export class IamUpdateMeAccountDto {
  @ApiProperty({
    type: String,
    description: 'id [input here api field description]',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'email [input here api field description]',
    example: 'john@gmial.com',
  })
  email?: string;

  @ApiProperty({
    type: String,
    description: 'username [input here api field description]',
  })
  username?: string;

  @ApiProperty({
    type: IamUpdateUserByIdDto,
    description: 'user [input here api field description]',
  })
  user?: IamUpdateUserByIdDto;
}
