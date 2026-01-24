/* eslint-disable indent */
import { OAuthClientDto } from '@api/o-auth/client';
import { OAuthRefreshTokenDto } from '@api/o-auth/refresh-token';
import { ApiProperty } from '@nestjs/swagger';

export class OAuthAccessTokenDto {
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
    description: 'clientId [input here api field description]',
    example: '467dc818-05a8-5053-9ec3-7ae4e2f225c0',
  })
  clientId: string;

  @ApiProperty({
    type: () => OAuthClientDto,
    description: 'OAuthClient [input here api field description]',
  })
  client?: OAuthClientDto;

  @ApiProperty({
    type: String,
    description: 'accountId [input here api field description]',
  })
  accountId?: string;

  @ApiProperty({
    type: String,
    description: 'token [input here api field description]',
  })
  token: string;

  @ApiProperty({
    type: String,
    description: 'name [input here api field description]',
  })
  name?: string;

  @ApiProperty({
    type: Boolean,
    description: 'isRevoked [input here api field description]',
  })
  isRevoked: boolean;

  @ApiProperty({
    type: String,
    description: 'expiresAt [input here api field description]',
  })
  expiresAt?: string;

  @ApiProperty({
    type: () => OAuthRefreshTokenDto,
    description: 'refreshToken [input here api field description]',
  })
  refreshToken?: OAuthRefreshTokenDto;

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
