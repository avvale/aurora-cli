/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { OAuthClientGrantType } from '../../../../../src/graphql';

export class OAuthCreateCredentialDto
{
    @ApiProperty({
        type       : String,
        description: 'grantType [input here api field description]',
        example    : OAuthClientGrantType.PASSWORD,
        enum       : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD'],
    })
    grantType: string;

    @ApiProperty({
        type       : String,
        description: 'username [input here api field description]',
        example    : 'john@gmail.com',
    })
    username?: string;

    @ApiProperty({
        type       : String,
        description: 'password [input here api field description]',
        example    : '123456',
    })
    password?: string;

    @ApiProperty({
        type       : String,
        description: 'email [input here api field description]',
        example    : 'john@gmail.com',
    })
    email?: string;

    @ApiProperty({
        type       : String,
        description: 'clientSecret [input here api field description]',
        example    : 'ktjfde3ibcxglzz7glw6ehoibcn4olk8yitqaqtlvpaot7n0514wdzayzmss7cd15abiohcfwzjh4i3a7q48ss8vfk',
    })
    clientSecret?: string;
}