/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { CommonCropAttachmentLibraryDto } from './common-crop-attachment-library.dto';

export class CommonCropAttachmentDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'familyId [input here api field description]',
    })
    familyId?: string;

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
    })
    isCropable: boolean;

    @ApiProperty({
        type       : Boolean,
        description: 'isUploaded [input here api field description]',
    })
    isUploaded: boolean;

    @ApiProperty({
        type       : Boolean,
        description: 'isChanged [input here api field description]',
    })
    isChanged: boolean;

    @ApiProperty({
        type       : String,
        description: 'libraryId [input here api field description]',
    })
    libraryId?: string;

    @ApiProperty({
        type       : String,
        description: 'libraryFilename [input here api field description]',
    })
    libraryFilename?: string;

    @ApiProperty({
        type       : Object,
        description: 'meta [input here api field description]',
    })
    meta: any;

    @ApiProperty({
        type       : CommonCropAttachmentLibraryDto,
        description: 'library [input here api field description]',
    })
    library: CommonCropAttachmentLibraryDto;

}
