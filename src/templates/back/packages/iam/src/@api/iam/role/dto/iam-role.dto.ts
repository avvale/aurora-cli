/* eslint-disable indent */
import { IamAccountDto } from '@api/iam/account';
import { IamPermissionDto } from '@api/iam/permission';
import { ApiProperty } from '@nestjs/swagger';

export class IamRoleDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type       : Boolean,
        description: 'isMaster [input here api field description]',
    })
    isMaster: boolean;

    @ApiProperty({
        type       : () => [IamPermissionDto],
        description: 'permissions [input here api field description]',
    })
    permissions?: IamPermissionDto[];

    @ApiProperty({
        type       : () => [IamAccountDto],
        description: 'accounts [input here api field description]',
    })
    accounts?: IamAccountDto[];

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