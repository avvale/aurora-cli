/* eslint-disable indent */
import { IamAccountType } from '@api/graphql';
import { IamRoleDto } from '@api/iam/role';
import { IamTenantDto } from '@api/iam/tenant';
import { IamUserDto } from '@api/iam/user';
import { OAuthClientDto } from '@api/o-auth/client';
import { ApiProperty } from '@nestjs/swagger';

export class IamAccountDto {
    @ApiProperty({
        type: String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type: Number,
        description: 'rowId [input here api field description]',
    })
    rowId: number;

    @ApiProperty({
        enum: IamAccountType,
        description: 'type [input here api field description]',
        example: IamAccountType.USER,
    })
    type: IamAccountType;

    @ApiProperty({
        type: String,
        description: 'code [input here api field description]',
    })
    code?: string;

    @ApiProperty({
        type: String,
        description: 'email [input here api field description]',
        example: 'john@gmial.com',
    })
    email?: string;

    @ApiProperty({
        type: String,
        description: 'username [input here api field description]',
    })
    username: string;

    @ApiProperty({
        type: Boolean,
        description: 'isActive [input here api field description]',
        example: true,
    })
    isActive: boolean;

    @ApiProperty({
        type: String,
        description: 'clientId [input here api field description]',
        example: '467dc818-05a8-5053-9ec3-7ae4e2f225c0',
    })
    clientId: string;

    @ApiProperty({
        type: () => OAuthClientDto,
        description: 'OAuthClient [input here api field description]',
    })
    client?: OAuthClientDto;

    @ApiProperty({
        type: Array,
        description: 'tags [input here api field description]',
    })
    tags?: string[];

    @ApiProperty({
        type: Array,
        description: 'scopes [input here api field description]',
    })
    scopes?: string[];

    @ApiProperty({
        type: Array,
        description: 'dApplicationCodes [input here api field description]',
    })
    dApplicationCodes: string[];

    @ApiProperty({
        type: Object,
        description: 'dPermissions [input here api field description]',
    })
    dPermissions: any;

    @ApiProperty({
        type: Array,
        description: 'dTenants [input here api field description]',
    })
    dTenants: string[];

    @ApiProperty({
        type: Object,
        description: 'meta [input here api field description]',
    })
    meta?: any;

    @ApiProperty({
        type: () => [IamRoleDto],
        description: 'roles [input here api field description]',
    })
    roles?: IamRoleDto[];

    @ApiProperty({
        type: () => [IamTenantDto],
        description: 'tenants [input here api field description]',
    })
    tenants?: IamTenantDto[];

    @ApiProperty({
        type: () => IamUserDto,
        description: 'user [input here api field description]',
    })
    user?: IamUserDto;

    @ApiProperty({
        type: String,
        description: 'createdAt [input here api field description]',
    })
    createdAt?: string;

    @ApiProperty({
        type: String,
        description: 'updatedAt [input here api field description]',
    })
    updatedAt?: string;

    @ApiProperty({
        type: String,
        description: 'deletedAt [input here api field description]',
    })
    deletedAt?: string;
}
