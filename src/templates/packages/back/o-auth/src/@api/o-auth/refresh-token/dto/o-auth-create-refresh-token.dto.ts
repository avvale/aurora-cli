/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class OAuthCreateRefreshTokenDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'accessTokenId [input here api field description]',
        example    : 'b51d79ed-7454-4a87-9d14-664bd5360187',
    })
    accessTokenId: string;

    @ApiProperty({
        type       : String,
        description: 'token [input here api field description]',
    })
    token: string;

    @ApiProperty({
        type       : Boolean,
        description: 'isRevoked [input here api field description]',
        example    : true,
    })
    isRevoked: boolean;

    @ApiProperty({
        type       : String,
        description: 'expiresAt [input here api field description]',
    })
    expiresAt?: string;

}