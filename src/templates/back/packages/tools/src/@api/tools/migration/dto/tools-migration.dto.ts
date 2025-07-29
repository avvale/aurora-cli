/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class ToolsMigrationDto
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
        description: 'version [input here api field description]',
    })
    version: string;

    @ApiProperty({
        type       : Boolean,
        description: 'isActive [input here api field description]',
    })
    isActive: boolean;

    @ApiProperty({
        type       : Boolean,
        description: 'isExecuted [input here api field description]',
    })
    isExecuted: boolean;

    @ApiProperty({
        type       : String,
        description: 'upScript [input here api field description]',
    })
    upScript?: string;

    @ApiProperty({
        type       : String,
        description: 'downScript [input here api field description]',
    })
    downScript?: string;

    @ApiProperty({
        type       : Number,
        description: 'sort [input here api field description]',
    })
    sort?: number;

    @ApiProperty({
        type       : String,
        description: 'executedAt [input here api field description]',
    })
    executedAt?: string;

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
