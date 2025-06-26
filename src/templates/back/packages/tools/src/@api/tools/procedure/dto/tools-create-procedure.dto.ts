/* eslint-disable indent */
import { ToolsProcedureType } from '@api/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class ToolsCreateProcedureDto
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
        enum       : ToolsProcedureType,
        enumName   : 'ToolsProcedureType',
        description: 'type [input here api field description]',
    })
    type: ToolsProcedureType;

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
        description: 'isUpdated [input here api field description]',
    })
    isUpdated: boolean;

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
        description: 'checkedAt [input here api field description]',
    })
    checkedAt?: string;

}
