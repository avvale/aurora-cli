/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { OAuthUpdateRefreshTokenDto } from '../../../o-auth/refresh-token/dto/o-auth-update-refresh-token.dto';

export class OAuthUpdateAccessTokenDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'clientId [input here api field description]',
        example    : 'd045c2a6-616e-4c60-a409-ccc4712ef965',
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
        type       : OAuthUpdateRefreshTokenDto,
        description: 'refreshToken [input here api field description]',
    })
    refreshToken?: OAuthUpdateRefreshTokenDto;

}