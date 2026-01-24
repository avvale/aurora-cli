/* eslint-disable indent */
import { OAuthClientDto } from '@api/o-auth/client';
import { ApiProperty } from '@nestjs/swagger';

export class OAuthApplicationDto {
  @ApiProperty({
    type: String,
    description: 'id [input here api field description]',
  })
  id: string;

  @ApiProperty({
    type: Number,
    description: 'rowId [input here api field description]',
  })
  rowId: number;

  @ApiProperty({
    type: String,
    description: 'code [input here api field description]',
  })
  code: string;

  @ApiProperty({
    type: String,
    description: 'name [input here api field description]',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'secret [input here api field description]',
  })
  secret: string;

  @ApiProperty({
    type: Boolean,
    description: 'isMaster [input here api field description]',
  })
  isMaster: boolean;

  @ApiProperty({
    type: () => [OAuthClientDto],
    description: 'clients [input here api field description]',
  })
  clients?: OAuthClientDto[];

  @ApiProperty({
    type: String,
    description: 'createdAt [input here api field description]',
  })
  createdAt?: string;

  @ApiProperty({
    type: String,
    description: 'updatedAt [input here api field description]',
  })
  updatedAt?: string;

  @ApiProperty({
    type: String,
    description: 'deletedAt [input here api field description]',
  })
  deletedAt?: string;
}
