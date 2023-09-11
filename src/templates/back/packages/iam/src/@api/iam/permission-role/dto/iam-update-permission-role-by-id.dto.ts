/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamUpdatePermissionRoleByIdDto
{
    @ApiProperty({
        type       : String,
        description: 'permissionId [input here api field description]',
    })
    permissionId: string;

    @ApiProperty({
        type       : String,
        description: 'roleId [input here api field description]',
    })
    roleId: string;

}
