/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { CommonCropPropertiesDto } from '../../crop/dto/common-crop-properties.dto';
import { CommonCropAttachmentDto } from './common-crop-attachment.dto';

export class CommonCreateCropDto
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
