/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class OAuthUpdateRefreshTokensDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id?: string;

    @ApiProperty({
        type       : String,
        description: 'accessTokenId [input here api field description]',
        example    : '58e38ed2-ebcb-47f0-882c-e3ab8412e5a4',
    })
    accessTokenId?: string;

    @ApiProperty({
        type       : String,
        description: 'token [input here api field description]',
    })
    token?: string;

    @ApiProperty({
        type       : Boolean,
        description: 'isRevoked [input here api field description]',
        example    : true,
    })
    isRevoked?: boolean;

    @ApiProperty({
        type       : String,
        description: 'expiresAt [input here api field description]',
    })
    expiresAt?: string;

}