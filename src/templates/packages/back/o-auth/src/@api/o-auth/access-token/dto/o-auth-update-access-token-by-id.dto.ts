/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { OAuthUpdateRefreshTokenByIdDto } from '../../../o-auth/refresh-token/dto/o-auth-update-refresh-token-by-id.dto';

export class OAuthUpdateAccessTokenByIdDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'clientId [input here api field description]',
        example    : '75746497-2d15-477e-ae98-64818585b26e',
    })
    clientId?: string;

    @ApiProperty({
        type       : String,
        description: 'accountId [input here api field description]',
    })
    accountId?: string;

    @ApiProperty({
        type       : String,
        description: 'token [input here api field description]',
    })
    token?: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name?: string;

    @ApiProperty({
        type       : Boolean,
        description: 'isRevoked [input here api field description]',
    })
    isRevoked?: boolean;

    @ApiProperty({
        type       : String,
        description: 'expiresAt [input here api field description]',
    })
    expiresAt?: string;

    @ApiProperty({
        type       : OAuthUpdateRefreshTokenByIdDto,
        description: 'refreshToken [input here api field description]',
    })
    refreshToken?: OAuthUpdateRefreshTokenByIdDto;

}