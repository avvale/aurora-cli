/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class OAuthUpdateRefreshTokenByIdDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'accessTokenId [input here api field description]',
        example    : 'd9bcc47a-6308-4fe0-9f8a-f888682cbcc3',
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