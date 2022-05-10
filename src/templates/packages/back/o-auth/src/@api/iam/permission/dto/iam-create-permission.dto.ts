/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamCreatePermissionDto
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
        type       : String,
        description: 'boundedContextId [input here api field description]',
        example    : '3b7f327e-0a20-4b87-917d-8f3636a09bb4',
    })
    boundedContextId: string;

    @ApiProperty({
        type       : [String],
        description: 'roles [input here api field description]',
    })
    roleIds?: string[];

}