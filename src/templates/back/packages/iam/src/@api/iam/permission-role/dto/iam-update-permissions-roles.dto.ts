/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamUpdatePermissionsRolesDto
{
    @ApiProperty({
        type       : String,
        description: 'permissionId [input here api field description]',
        example    : '1f926f17-a708-558b-a170-a5d97ef653b3',
    })
    permissionId?: string;

    @ApiProperty({
        type       : String,
        description: 'roleId [input here api field description]',
        example    : 'ab346a5d-bde9-59fd-a36a-b60458aed754',
    })
    roleId?: string;

}
