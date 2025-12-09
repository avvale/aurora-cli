/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class MessageUpdateOutboxesDto {
    @ApiProperty({
        type: String,
        description: 'id [input here api field description]',
    })
    id?: string;

    @ApiProperty({
        type: String,
        description: 'messageId [input here api field description]',
        example: '9174ad7d-6337-5e08-8614-987435969064',
    })
    messageId?: string;

    @ApiProperty({
        type: Array,
        description: 'accountRecipientIds [input here api field description]',
    })
    accountRecipientIds?: string[];

    @ApiProperty({
        type: Array,
        description: 'tenantRecipientIds [input here api field description]',
    })
    tenantRecipientIds?: string[];

    @ApiProperty({
        type: Array,
        description: 'scopeRecipients [input here api field description]',
    })
    scopeRecipients?: string[];

    @ApiProperty({
        type: Array,
        description: 'tagRecipients [input here api field description]',
    })
    tagRecipients?: string[];

    @ApiProperty({
        type: Object,
        description: 'meta [input here api field description]',
    })
    meta?: any;
}
