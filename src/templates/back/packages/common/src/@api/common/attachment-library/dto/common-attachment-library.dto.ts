/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class CommonAttachmentLibraryDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'filename [input here api field description]',
    })
    filename: string;

    @ApiProperty({
        type       : String,
        description: 'mimetype [input here api field description]',
    })
    mimetype: string;

    @ApiProperty({
        type       : String,
        description: 'extension [input here api field description]',
    })
    extension: string;

    @ApiProperty({
        type       : Object,
        description: 'relativePathSegments [input here api field description]',
    })
    relativePathSegments: any;

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
        type       : Number,
        description: 'size [input here api field description]',
    })
    size: number;

    @ApiProperty({
        type       : String,
        description: 'url [input here api field description]',
    })
    url: string;

    @ApiProperty({
        type       : Boolean,
        description: 'isCropable [input here api field description]',
        example    : true,
    })
    isCropable: boolean;

    @ApiProperty({
        type       : Object,
        description: 'meta [input here api field description]',
    })
    meta?: any;

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