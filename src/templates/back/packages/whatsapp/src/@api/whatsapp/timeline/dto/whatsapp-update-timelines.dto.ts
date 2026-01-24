/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class WhatsappUpdateTimelinesDto {
  @ApiProperty({
    type: String,
    description: 'id [input here api field description]',
  })
  id?: string;

  @ApiProperty({
    type: Array,
    description: 'accounts [input here api field description]',
  })
  accounts?: string[];

  @ApiProperty({
    type: String,
    description: 'wabaPhoneNumberId [input here api field description]',
  })
  wabaPhoneNumberId?: string;

  @ApiProperty({
    type: String,
    description: 'wabaContactId [input here api field description]',
  })
  wabaContactId?: string;
}
