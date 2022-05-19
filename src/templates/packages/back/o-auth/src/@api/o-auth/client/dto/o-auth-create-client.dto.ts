/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { OAuthClientGrantType } from '../../../../graphql';

export class OAuthCreateClientDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : OAuthClientGrantType,
        enum       : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD'],
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
        description: 'scopes [input here api field description]',
    })
    scopes?: any;

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