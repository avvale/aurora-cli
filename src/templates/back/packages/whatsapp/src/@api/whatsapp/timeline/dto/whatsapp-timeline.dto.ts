/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class WhatsappTimelineDto {
  @ApiProperty({
    type: String,
    description: 'id [input here api field description]',
  })
  id: string;

  @ApiProperty({
    type: Array,
    description: 'accounts [input here api field description]',
  })
  accounts?: string[];

  @ApiProperty({
    type: String,
    description: 'wabaPhoneNumberId [input here api field description]',
  })
  wabaPhoneNumberId: string;

  @ApiProperty({
    type: String,
    description: 'wabaContactId [input here api field description]',
  })
  wabaContactId: string;

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
