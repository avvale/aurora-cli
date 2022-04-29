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
        example    : 'e6b15227-ba45-472a-8f55-79b67447add9',
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
        description: 'username [input here api field description]',
    })
    username: string;

    @ApiProperty({
        type       : String,
        description: 'password [input here api field description]',
    })
    password: string;

    @ApiProperty({
        type       : String,
        description: 'rememberToken [input here api field description]',
    })
    rememberToken?: string;

    @ApiProperty({
        type       : Object,
        description: 'data [input here api field description]',
    })
    data?: any;

}