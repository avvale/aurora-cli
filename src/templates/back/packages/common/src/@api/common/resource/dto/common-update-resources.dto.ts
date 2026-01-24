/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class CommonUpdateResourcesDto {
  @ApiProperty({
    type: String,
    description: 'id [input here api field description]',
  })
  id?: string;

  @ApiProperty({
    type: String,
    description: 'code [input here api field description]',
  })
  code?: string;

  @ApiProperty({
    type: String,
    description: 'name [input here api field description]',
  })
  name?: string;

  @ApiProperty({
    type: Boolean,
    description: 'isActive [input here api field description]',
  })
  isActive?: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'hasAttachments [input here api field description]',
  })
  hasAttachments?: boolean;
}
