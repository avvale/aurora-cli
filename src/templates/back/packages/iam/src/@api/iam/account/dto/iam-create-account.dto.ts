/* eslint-disable indent */
import { IamAccountType } from '@api/graphql';
import { IamCreateUserDto } from '@api/iam/user';
import { ApiProperty } from '@nestjs/swagger';

export class IamCreateAccountDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        enum       : IamAccountType,
        enumName   : 'IamAccountType',
        description: 'type [input here api field description]',
        example    : IamAccountType.USER,
    })
    type: IamAccountType;

    @ApiProperty({
        type       : String,
        description: 'code [input here api field description]',
    })
    code?: string;

    @ApiProperty({
        type       : String,
        description: 'email [input here api field description]',
        example    : 'john@gmial.com',
    })
    email?: string;

    @ApiProperty({
        type       : String,
        description: 'username [input here api field description]',
    })
    username: string;

    @ApiProperty({
        type       : Boolean,
        description: 'isActive [input here api field description]',
        example    : true,
    })
    isActive: boolean;

    @ApiProperty({
        type       : String,
        description: 'clientId [input here api field description]',
        example    : '467dc818-05a8-5053-9ec3-7ae4e2f225c0',
    })
    clientId: string;

    @ApiProperty({
        type       : Array,
        description: 'tags [input here api field description]',
    })
    tags?: string[];

    @ApiProperty({
        type       : Array,
        description: 'scopes [input here api field description]',
    })
    scopes?: string[];

    @ApiProperty({
        type       : Array,
        description: 'dApplicationCodes [input here api field description]',
    })
    dApplicationCodes: string[];

    @ApiProperty({
        type       : Object,
        description: 'dPermissions [input here api field description]',
    })
    dPermissions: any;

    @ApiProperty({
        type       : Object,
        description: 'meta [input here api field description]',
    })
    meta?: any;

    @ApiProperty({
        type       : [String],
        description: 'roles [input here api field description]',
    })
    roleIds?: string[];

    @ApiProperty({
        type       : [String],
        description: 'tenants [input here api field description]',
    })
    tenantIds?: string[];

    @ApiProperty({
        type       : Boolean,
        description: 'hasAddChildTenants [input here api field description]',
        example    : true,
    })
    hasAddChildTenants?: boolean;

    @ApiProperty({
        type       : IamCreateUserDto,
        description: 'user [input here api field description]',
    })
    user?: IamCreateUserDto;

}
