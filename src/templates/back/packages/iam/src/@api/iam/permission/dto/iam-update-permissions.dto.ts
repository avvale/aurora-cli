/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamUpdatePermissionsDto
{
    @ApiProperty({
        type       : String,
        description: 'UUID for permission',
    })
    id?: string;

    @ApiProperty({
        type       : String,
        description: 'Permission name, this name is unique and used to evaluate if a user can consume or access a resource',
    })
    name?: string;

    @ApiProperty({
        type       : String,
        description: 'UUID for bounded context, a permission is associated with a bounded context',
        example    : '97419405-ebb7-5d5a-83e1-7416a72a28d6',
    })
    boundedContextId?: string;

    @ApiProperty({
        type       : [String],
        description: 'List of roles associated with the permission',
    })
    roleIds?: string[];

}
