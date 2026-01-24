/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class ToolsUpdateWebhookLogByIdDto {
  @ApiProperty({
    type: String,
    description: 'id [input here api field description]',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'url [input here api field description]',
  })
  url?: string;

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
}
