/* eslint-disable indent */
import { CommonAttachmentFamilyFitType, CommonAttachmentFamilyFormat } from '@api/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class CommonUpdateAttachmentFamiliesDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id?: string;

    @ApiProperty({
        type       : String,
        description: 'resourceId [input here api field description]',
        example    : '0a14256f-3caa-5783-909e-8ff8ff84fc16',
    })
    resourceId?: string;

    @ApiProperty({
        type       : String,
        description: 'code [input here api field description]',
    })
    code?: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name?: string;

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
        type       : CommonAttachmentFamilyFitType,
        enum       : ['FIT_CROP','FIT_WIDTH','FIT_HEIGHT','FIT_WIDTH_FREE_CROP','FIT_HEIGHT_FREE_CROP'],
        description: 'fitType [input here api field description]',
        example    : CommonAttachmentFamilyFitType.FIT_CROP,
    })
    fitType?: CommonAttachmentFamilyFitType;

    @ApiProperty({
        type       : Number,
        description: 'quality [input here api field description]',
    })
    quality?: number;

    @ApiProperty({
        type       : Object,
        description: 'sizes [input here api field description]',
    })
    sizes?: any;

    @ApiProperty({
        type       : CommonAttachmentFamilyFormat,
        enum       : ['JPG','PNG','GIF','TIF','BMP'],
        description: 'format [input here api field description]',
        example    : CommonAttachmentFamilyFormat.JPG,
    })
    format?: CommonAttachmentFamilyFormat;

}
