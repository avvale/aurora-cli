/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class CommonUpdateAttachmentLibrariesDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id?: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name?: string;

    @ApiProperty({
        type       : String,
        description: 'path [input here api field description]',
    })
    path?: string;

    @ApiProperty({
        type       : String,
        description: 'filename [input here api field description]',
    })
    filename?: string;

    @ApiProperty({
        type       : String,
        description: 'url [input here api field description]',
    })
    url?: string;

    @ApiProperty({
        type       : String,
        description: 'mime [input here api field description]',
    })
    mime?: string;

    @ApiProperty({
        type       : String,
        description: 'extension [input here api field description]',
    })
    extension?: string;

    @ApiProperty({
        type       : Number,
        description: 'size [input here api field description]',
    })
    size?: number;

    @ApiProperty({
        type       : Number,
        description: 'width [input here api field description]',
    })
    width?: number;

    @ApiProperty({
        type       : Number,
        description: 'height [input here api field description]',
    })
    height?: number;

    @ApiProperty({
        type       : Object,
        description: 'meta [input here api field description]',
    })
    meta?: any;

}
