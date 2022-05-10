/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { OAuthClientDto } from '../../../o-auth/client/dto/o-auth-client.dto';
import { OAuthRefreshTokenDto } from '../../../o-auth/refresh-token/dto/o-auth-refresh-token.dto';

export class OAuthAccessTokenDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'clientId [input here api field description]',
        example    : 'd4e02133-9658-4aea-b109-4034021618e4',
    })
    clientId: string;

    @ApiProperty({
        type       : () => OAuthClientDto,
        description: 'OAuthClient [input here api field description]',
    })
    client?: OAuthClientDto;

    @ApiProperty({
        type       : String,
        description: 'accountId [input here api field description]',
    })
    accountId?: string;

    @ApiProperty({
        type       : String,
        description: 'token [input here api field description]',
    })
    token: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name?: string;

    @ApiProperty({
        type       : Boolean,
        description: 'isRevoked [input here api field description]',
    })
    isRevoked: boolean;

    @ApiProperty({
        type       : String,
        description: 'expiresAt [input here api field description]',
    })
    expiresAt?: string;

    @ApiProperty({
        type       : () => OAuthRefreshTokenDto,
        description: 'refreshToken [input here api field description]',
    })
    refreshToken?: OAuthRefreshTokenDto;

    @ApiProperty({
        type       : String,
        description: 'createdAt [input here api field description]',
    })
    createdAt?: string;

    @ApiProperty({
        type       : String,
        description: 'updatedAt [input here api field description]',
    })
    updatedAt?: string;

    @ApiProperty({
        type       : String,
        description: 'deletedAt [input here api field description]',
    })
    deletedAt?: string;

}