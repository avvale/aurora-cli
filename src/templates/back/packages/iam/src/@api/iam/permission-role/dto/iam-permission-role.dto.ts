/* eslint-disable indent */
import { IamPermissionDto } from '@api/iam/permission';
import { IamRoleDto } from '@api/iam/role';
import { ApiProperty } from '@nestjs/swagger';

export class IamPermissionRoleDto
{
    @ApiProperty({
        type       : String,
        description: 'permissionId [input here api field description]',
        example    : '1f926f17-a708-558b-a170-a5d97ef653b3',
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
        example    : 'ab346a5d-bde9-59fd-a36a-b60458aed754',
    })
    roleId: string;

    @ApiProperty({
        type       : () => IamRoleDto,
        description: 'IamRole [input here api field description]',
    })
    role?: IamRoleDto;

}
