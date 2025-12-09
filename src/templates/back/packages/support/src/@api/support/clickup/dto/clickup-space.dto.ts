/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class ClickupSpaceDto {
    @ApiProperty({
        type: String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type: String,
        description: 'name [input here api field description]',
    })
    name?: string;

    @ApiProperty({
        type: String,
        description: 'color [input here api field description]',
    })
    color?: string;

    @ApiProperty({
        type: Boolean,
        description: 'private [input here api field description]',
    })
    private?: boolean;

    @ApiProperty({
        type: String,
        description: 'avatar [input here api field description]',
    })
    avatar?: string;

    @ApiProperty({
        type: Boolean,
        description: 'admin_can_manage [input here api field description]',
    })
    admin_can_manage?: boolean;
}
