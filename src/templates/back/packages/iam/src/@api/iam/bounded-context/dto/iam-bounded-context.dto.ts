/* eslint-disable indent */
import { IamPermissionDto } from '@api/iam/permission';
import { ApiProperty } from '@nestjs/swagger';

export class IamBoundedContextDto
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
        description: 'root [input here api field description]',
    })
    root: string;

    @ApiProperty({
        type       : Number,
        description: 'sort [input here api field description]',
    })
    sort?: number;

    @ApiProperty({
        type       : Boolean,
        description: 'isActive [input here api field description]',
        example    : true,
    })
    isActive: boolean;

    @ApiProperty({
        type       : () => [IamPermissionDto],
        description: 'permissions [input here api field description]',
    })
    permissions?: IamPermissionDto[];

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
