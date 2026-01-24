/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class QueueManagerQueueDto {
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
    description: 'prefix [input here api field description]',
  })
  prefix: string;

  @ApiProperty({
    type: String,
    description: 'name [input here api field description]',
  })
  name: string;

  @ApiProperty({
    type: Number,
    description: 'waitingJobs [input here api field description]',
  })
  waitingJobs: number;

  @ApiProperty({
    type: Number,
    description: 'activeJobs [input here api field description]',
  })
  activeJobs: number;

  @ApiProperty({
    type: Number,
    description: 'completedJobs [input here api field description]',
  })
  completedJobs: number;

  @ApiProperty({
    type: Number,
    description: 'failedJobs [input here api field description]',
  })
  failedJobs: number;

  @ApiProperty({
    type: Number,
    description: 'delayedJobs [input here api field description]',
  })
  delayedJobs: number;

  @ApiProperty({
    type: Number,
    description: 'pausedJobs [input here api field description]',
  })
  pausedJobs: number;

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
