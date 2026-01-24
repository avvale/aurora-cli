/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class MessageInboxSettingDto {
  @ApiProperty({
    type: String,
    description: 'id [input here api field description]',
  })
  id: string;

  @ApiProperty({
    type: Number,
    description: 'rowId [input here api field description]',
  })
  rowId: number;

  @ApiProperty({
    type: String,
    description: 'accountId [input here api field description]',
  })
  accountId: string;

  @ApiProperty({
    type: Number,
    description: 'lastReadMessageRowId [input here api field description]',
  })
  lastReadMessageRowId: number;

  @ApiProperty({
    type: String,
    description: 'createdAt [input here api field description]',
  })
  createdAt?: string;

  @ApiProperty({
    type: String,
    description: 'updatedAt [input here api field description]',
  })
  updatedAt?: string;

  @ApiProperty({
    type: String,
    description: 'deletedAt [input here api field description]',
  })
  deletedAt?: string;
}
