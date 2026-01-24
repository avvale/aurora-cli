/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamUpdateTagsDto {
  @ApiProperty({
    type: String,
    description: 'id [input here api field description]',
  })
  id?: string;

  @ApiProperty({
    type: String,
    description: 'name [input here api field description]',
  })
  name?: string;
}
