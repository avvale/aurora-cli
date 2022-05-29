/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { OAuthClientGrantType } from '../../../../graphql';

export class OAuthCreateCredentialsDto
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
        example    : 'ktjfde3ibcxglzz7glw6ehoibcn4olk8yitqaqtlvp',
    })
    clientSecret?: string;

    @ApiProperty({
        type       : String,
        description: 'accessTokenId [input here api field description]',
        example    : '1b9b5609-21b4-4efd-90d5-5ff1869a4fc3',
    })
    accessTokenId?: string;

    @ApiProperty({
        type       : String,
        description: 'refreshToken [input here api field description]',
        example    : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    })
    refreshToken?: string;

    @ApiProperty({
        type       : String,
        description: 'redirect [input here api field description]',
        example    : 'https://contoso.com/',
    })
    redirect?: string;
}