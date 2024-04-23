/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamCreateUserDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'accountId [input here api field description]',
        example    : 'bb311dbd-dd0b-5412-bf15-ca58a8aa48db',
    })
    accountId: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type       : String,
        description: 'surname [input here api field description]',
    })
    surname?: string;

    @ApiProperty({
        type       : String,
        description: 'avatar [input here api field description]',
    })
    avatar?: string;

    @ApiProperty({
        type       : String,
        description: 'mobile [input here api field description]',
    })
    mobile?: string;

    @ApiProperty({
        type       : String,
        description: 'langId [input here api field description]',
    })
    langId?: string;

    @ApiProperty({
        type       : String,
        description: 'password [input here api field description]',
    })
    password: string;

    @ApiProperty({
        type       : Boolean,
        description: 'isTwoFactorAuthenticationEnabled [input here api field description]',
    })
    isTwoFactorAuthenticationEnabled: boolean;

    @ApiProperty({
        type       : String,
        description: 'twoFactorAuthenticationSecret [input here api field description]',
    })
    twoFactorAuthenticationSecret?: string;

    @ApiProperty({
        type       : String,
        description: 'rememberToken [input here api field description]',
    })
    rememberToken?: string;

    @ApiProperty({
        type       : Object,
        description: 'meta [input here api field description]',
    })
    meta?: any;

}
