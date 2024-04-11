/* eslint-disable indent */
import { MessageMessageDto } from '@api/message/message';
import { ApiProperty } from '@nestjs/swagger';

export class MessageOutboxDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'messageId [input here api field description]',
        example    : '9174ad7d-6337-5e08-8614-987435969064',
    })
    messageId: string;

    @ApiProperty({
        type       : () => MessageMessageDto,
        description: 'MessageMessage [input here api field description]',
    })
    message?: MessageMessageDto;

    @ApiProperty({
        type       : Number,
        description: 'sort [input here api field description]',
    })
    sort: number;

    @ApiProperty({
        type       : Array,
        description: 'accountRecipientIds [input here api field description]',
    })
    accountRecipientIds?: string[];

    @ApiProperty({
        type       : Array,
        description: 'tenantRecipientIds [input here api field description]',
    })
    tenantRecipientIds?: string[];

    @ApiProperty({
        type       : Array,
        description: 'scopeRecipients [input here api field description]',
    })
    scopeRecipients?: string[];

    @ApiProperty({
        type       : Array,
        description: 'tagRecipients [input here api field description]',
    })
    tagRecipients?: string[];

    @ApiProperty({
        type       : Object,
        description: 'meta [input here api field description]',
    })
    meta?: any;

    @ApiProperty({
        type       : String,
        description: 'createdAt [input here api field description]',
    })
    createdAt?: string;

    @ApiProperty({
        type       : String,
        description: 'updatedAt [input here api field description]',
    })
    updatedAt?: string;

    @ApiProperty({
        type       : String,
        description: 'deletedAt [input here api field description]',
    })
    deletedAt?: string;

}
