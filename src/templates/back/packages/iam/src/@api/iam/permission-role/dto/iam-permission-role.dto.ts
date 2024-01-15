/* eslint-disable indent */
import { IamPermissionDto } from '@api/iam/permission';
import { IamRoleDto } from '@api/iam/role';
import { ApiProperty } from '@nestjs/swagger';

export class IamPermissionRoleDto
{
    @ApiProperty({
        type       : String,
        description: 'permissionId [input here api field description]',
    })
    permissionId: string;

    @ApiProperty({
        type       : () => IamPermissionDto,
        description: 'IamPermission [input here api field description]',
    })
    permission?: IamPermissionDto;

    @ApiProperty({
        type       : String,
        description: 'roleId [input here api field description]',
    })
    roleId: string;

    @ApiProperty({
        type       : () => IamRoleDto,
        description: 'IamRole [input here api field description]',
    })
    role?: IamRoleDto;

}
