/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class StorageAccountFileManagerFileDto {
    @ApiProperty({
        type: String,
        description: 'filename [input here api field description]',
    })
    filename: string;

    @ApiProperty({
        type: [String],
        description: 'relativePathSegments [input here api field description]',
    })
    relativePathSegments: string[];

    @ApiProperty({
        type: String,
        description: 'containerName [input here api field description]',
    })
    containerName?: string;
}
