/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class ToolsUpdateWebhookByIdDto {
  @ApiProperty({
    type: String,
    description: 'id [input here api field description]',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'name [input here api field description]',
  })
  name?: string;

  @ApiProperty({
    type: String,
    description: 'service [input here api field description]',
  })
  service?: string;

  @ApiProperty({
    type: String,
    description: 'endpoint [input here api field description]',
  })
  endpoint?: string;

  @ApiProperty({
    type: String,
    description: 'externalId [input here api field description]',
  })
  externalId?: string;

  @ApiProperty({
    type: Array,
    description: 'events [input here api field description]',
  })
  events?: string[];

  @ApiProperty({
    type: String,
    description: 'secret [input here api field description]',
  })
  secret?: string;

  @ApiProperty({
    type: Object,
    description: 'meta [input here api field description]',
  })
  meta?: any;
}
