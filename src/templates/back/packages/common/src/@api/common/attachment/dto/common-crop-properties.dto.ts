/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class CommonCropPropertiesDto
{
    @ApiProperty({
        type       : Number,
        description: 'x [input here api field description]',
    })
    x: number;

    @ApiProperty({
        type       : Number,
        description: 'y [input here api field description]',
    })
    y: number;

    @ApiProperty({
        type       : Number,
        description: 'width [input here api field description]',
    })
    width: number;

    @ApiProperty({
        type       : Number,
        description: 'height [input here api field description]',
    })
    height: number;

    @ApiProperty({
        type       : Number,
        description: 'rotate [input here api field description]',
    })
    rotate: number;

    @ApiProperty({
        type       : Number,
        description: 'scaleX [input here api field description]',
    })
    scaleX: number;

    @ApiProperty({
        type       : Number,
        description: 'scaleY [input here api field description]',
    })
    scaleY: number;

}
