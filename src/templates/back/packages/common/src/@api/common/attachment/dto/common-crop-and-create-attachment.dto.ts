/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { CommonCropPropertiesDto } from './common-crop-properties.dto';
import { CommonCropAttachmentDto } from './common-crop-attachment.dto';

export class CommonCropAndCreateAttachmentDto
{
    @ApiProperty({
        type       : CommonCropAttachmentDto,
        description: 'attachment [input here api field description]',
    })
    attachment: CommonCropAttachmentDto;

    @ApiProperty({
        type       : CommonCropPropertiesDto,
        description: 'crop [input here api field description]',
    })
    crop?: CommonCropPropertiesDto;

}
