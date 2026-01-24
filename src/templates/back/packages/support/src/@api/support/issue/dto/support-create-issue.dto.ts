/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class SupportCreateIssueDto {
  @ApiProperty({
    type: String,
    description: 'id [input here api field description]',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'externalId [input here api field description]',
  })
  externalId?: string;

  @ApiProperty({
    type: String,
    description: 'externalStatus [input here api field description]',
  })
  externalStatus?: string;

  @ApiProperty({
    type: String,
    description: 'externalColorStatus [input here api field description]',
  })
  externalColorStatus?: string;

  @ApiProperty({
    type: String,
    description: 'accountId [input here api field description]',
    example: 'bb311dbd-dd0b-5412-bf15-ca58a8aa48db',
  })
  accountId?: string;

  @ApiProperty({
    type: String,
    description: 'accountUsername [input here api field description]',
  })
  accountUsername?: string;

  @ApiProperty({
    type: String,
    description: 'displayName [input here api field description]',
  })
  displayName?: string;

  @ApiProperty({
    type: String,
    description: 'frontEnvironment [input here api field description]',
  })
  frontEnvironment?: string;

  @ApiProperty({
    type: String,
    description: 'frontVersion [input here api field description]',
  })
  frontVersion?: string;

  @ApiProperty({
    type: String,
    description: 'backEnvironment [input here api field description]',
  })
  backEnvironment?: string;

  @ApiProperty({
    type: String,
    description: 'backVersion [input here api field description]',
  })
  backVersion?: string;

  @ApiProperty({
    type: String,
    description: 'subject [input here api field description]',
  })
  subject: string;

  @ApiProperty({
    type: String,
    description: 'description [input here api field description]',
  })
  description: string;

  @ApiProperty({
    type: Object,
    description: 'attachments [input here api field description]',
  })
  attachments?: any;

  @ApiProperty({
    type: Object,
    description: 'screenRecording [input here api field description]',
  })
  screenRecording?: any;

  @ApiProperty({
    type: Object,
    description: 'meta [input here api field description]',
  })
  meta?: any;
}
