/* eslint-disable indent */
import { OAuthClientGrantType } from '@api/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class OAuthCreateClientDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        enum       : OAuthClientGrantType,
        description: 'grantType [input here api field description]',
    })
    grantType: OAuthClientGrantType;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type       : String,
        description: 'secret [input here api field description]',
    })
    secret: string;

    @ApiProperty({
        type       : String,
        description: 'authUrl [input here api field description]',
    })
    authUrl?: string;

    @ApiProperty({
        type       : String,
        description: 'redirect [input here api field description]',
    })
    redirect?: string;

    @ApiProperty({
        type       : Object,
        description: 'scopeOptions [input here api field description]',
    })
    scopeOptions?: any;

    @ApiProperty({
        type       : Number,
        description: 'expiredAccessToken [input here api field description]',
    })
    expiredAccessToken?: number;

    @ApiProperty({
        type       : Number,
        description: 'expiredRefreshToken [input here api field description]',
    })
    expiredRefreshToken?: number;

    @ApiProperty({
        type       : Boolean,
        description: 'isActive [input here api field description]',
        example    : true,
    })
    isActive: boolean;

    @ApiProperty({
        type       : Boolean,
        description: 'isMaster [input here api field description]',
    })
    isMaster: boolean;

    @ApiProperty({
        type       : [String],
        description: 'applications [input here api field description]',
    })
    applicationIds?: string[];

}
