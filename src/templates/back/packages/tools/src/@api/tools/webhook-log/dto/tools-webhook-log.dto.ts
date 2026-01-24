/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class ToolsWebhookLogDto {
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
    description: 'url [input here api field description]',
  })
  url: string;

  @ApiProperty({
    type: Object,
    description: 'headerRequest [input here api field description]',
  })
  headerRequest?: any;

  @ApiProperty({
    type: Object,
    description: 'bodyRequest [input here api field description]',
  })
  bodyRequest?: any;

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
