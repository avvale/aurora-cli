/* eslint-disable indent */
import { ToolsKeyValueType } from '@api/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class ToolsCreateKeyValueDto {
    @ApiProperty({
        type: String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type: String,
        description: 'key [input here api field description]',
    })
    key: string;

    @ApiProperty({
        enum: ToolsKeyValueType,
        description: 'type [input here api field description]',
    })
    type: ToolsKeyValueType;

    @ApiProperty({
        type: String,
        description: 'value [input here api field description]',
    })
    value: string;

    @ApiProperty({
        type: Boolean,
        description: 'isActive [input here api field description]',
    })
    isActive: boolean;

    @ApiProperty({
        type: String,
        description: 'description [input here api field description]',
    })
    description?: string;
}
