/* eslint-disable indent */
import { OAuthAccessTokenDto } from '@api/o-auth/access-token';
import { ApiProperty } from '@nestjs/swagger';

export class OAuthRefreshTokenDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'accessTokenId [input here api field description]',
        example    : 'e3ce9656-2ba9-5125-9902-46fb3e763193',
    })
    accessTokenId: string;

    @ApiProperty({
        type       : () => OAuthAccessTokenDto,
        description: 'accessTokenId [input here api field description]',
    })
    accessToken?: OAuthAccessTokenDto;

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