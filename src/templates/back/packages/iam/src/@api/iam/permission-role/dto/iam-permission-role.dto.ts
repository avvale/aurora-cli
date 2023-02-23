/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IamRoleDto } from '../../../iam/role/dto/iam-role.dto';
import { IamPermissionDto } from '@api/iam/permission/dto';

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