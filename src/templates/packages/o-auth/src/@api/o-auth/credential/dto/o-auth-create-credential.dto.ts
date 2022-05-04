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

    /* @ApiProperty({
        type       : String,
        description: 'accessTokenId [input here api field description]',
        example    : '077e099f-2640-4f12-b1d8-eef80ee8cff9',
    })
    accessTokenId: string;

    @ApiProperty({
        type       : String,
        description: 'refreshToken [input here api field description]',
        example    : 'z712mh21s0t0bbwi9f5cn2r9kphy7gtqx1bt0ghinw1gv93s1bv7irggh8t4aauqj3ozad3yshhaw50q33ybiy7znph3gkafwlhr80e3gy5bx46z',
    })
    refreshToken: string;

    @ApiProperty({
        type       : String,
        description: 'redirect [input here api field description]',
        example    : 'https://contoso.com/redirect',
    })
    redirect: string; */
}