/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamCreateRoleDto
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
        type       : [String],
        description: 'permissions [input here api field description]',
    })
    permissionIds?: string[];

    @ApiProperty({
        type       : [String],
        description: 'accounts [input here api field description]',
    })
    accountIds?: string[];

}