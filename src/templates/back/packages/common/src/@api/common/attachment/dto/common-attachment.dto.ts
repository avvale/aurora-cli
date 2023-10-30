/* eslint-disable indent */
import { CommonAttachmentFamilyDto } from '@api/common/attachment-family';
import { CommonAttachmentLibraryDto } from '@api/common/attachment-library';
import { ApiProperty } from '@nestjs/swagger';

export class CommonAttachmentDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'familyId [input here api field description]',
        example    : 'fe33cdb0-4ab0-55cb-965d-1703c9509a84',
    })
    familyId?: string;

    @ApiProperty({
        type       : () => CommonAttachmentFamilyDto,
        description: 'CommonAttachmentFamily [input here api field description]',
    })
    family?: CommonAttachmentFamilyDto;

    @ApiProperty({
        type       : Number,
        description: 'sort [input here api field description]',
    })
    sort?: number;

    @ApiProperty({
        type       : String,
        description: 'alt [input here api field description]',
    })
    alt?: string;

    @ApiProperty({
        type       : String,
        description: 'title [input here api field description]',
    })
    title?: string;

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
        type       : String,
        description: 'libraryId [input here api field description]',
        example    : 'e703e3d2-5509-5e86-8b55-58e9f0d4249a',
    })
    libraryId?: string;

    @ApiProperty({
        type       : () => CommonAttachmentLibraryDto,
        description: 'CommonAttachmentLibrary [input here api field description]',
    })
    library?: CommonAttachmentLibraryDto;

    @ApiProperty({
        type       : String,
        description: 'libraryFilename [input here api field description]',
    })
    libraryFilename?: string;

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