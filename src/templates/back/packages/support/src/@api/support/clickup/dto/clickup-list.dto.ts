/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class ClickupListDto {
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
    type: Number,
    description: 'orderindex [input here api field description]',
  })
  orderindex?: number;

  @ApiProperty({
    type: String,
    description: 'content [input here api field description]',
  })
  content?: string;

  @ApiProperty({
    type: String,
    description: 'status [input here api field description]',
  })
  status?: string;

  @ApiProperty({
    type: String,
    description: 'priority [input here api field description]',
  })
  priority?: string;

  @ApiProperty({
    type: String,
    description: 'assignee [input here api field description]',
  })
  assignee?: string;

  @ApiProperty({
    type: Number,
    description: 'task_count [input here api field description]',
  })
  task_count?: number;

  @ApiProperty({
    type: String,
    description: 'due_date [input here api field description]',
  })
  due_date?: string;

  @ApiProperty({
    type: String,
    description: 'start_date [input here api field description]',
  })
  start_date?: string;

  @ApiProperty({
    type: Boolean,
    description: 'archived [input here api field description]',
  })
  archived?: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'override_statuses [input here api field description]',
  })
  override_statuses?: boolean;
}
