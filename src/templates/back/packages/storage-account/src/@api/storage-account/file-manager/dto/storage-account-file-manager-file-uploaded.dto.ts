/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class StorageAccountFileManagerFileUploadedDto {
  @ApiProperty({
    type: String,
    description: 'id [input here api field description]',
  })
  id: string;

  @ApiProperty({
    type: Object,
    description: 'file [input here api field description]',
  })
  file: any;

  @ApiProperty({
    type: Number,
    description: 'size [input here api field description]',
  })
  size: number;

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

  @ApiProperty({
    type: Boolean,
    description: 'hasCreateLibrary [input here api field description]',
  })
  hasCreateLibrary?: boolean;

  @ApiProperty({
    type: Object,
    description: 'meta [input here api field description]',
  })
  meta?: any;
}
