/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class OAuthCreateScopeDto {
  @ApiProperty({
    type: String,
    description: 'id [input here api field description]',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'code [input here api field description]',
    example: 'EDIT',
  })
  code: string;

  @ApiProperty({
    type: String,
    description: 'name [input here api field description]',
  })
  name: string;

  @ApiProperty({
    type: Array,
    description: 'roleIds [input here api field description]',
  })
  roleIds?: string[];
}
