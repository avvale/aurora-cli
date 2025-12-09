/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class MessageCreateInboxDto {
    @ApiProperty({
        type: String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type: Array,
        description: 'tenantIds [input here api field description]',
    })
    tenantIds?: string[];

    @ApiProperty({
        type: String,
        description: 'messageId [input here api field description]',
        example: '9174ad7d-6337-5e08-8614-987435969064',
    })
    messageId?: string;

    @ApiProperty({
        type: Number,
        description: 'messageRowId [input here api field description]',
    })
    messageRowId: number;

    @ApiProperty({
        type: String,
        description: 'accountId [input here api field description]',
    })
    accountId: string;

    @ApiProperty({
        type: String,
        description: 'accountCode [input here api field description]',
    })
    accountCode?: string;

    @ApiProperty({
        type: Boolean,
        description: 'isImportant [input here api field description]',
    })
    isImportant: boolean;

    @ApiProperty({
        type: String,
        description: 'sentAt [input here api field description]',
    })
    sentAt: string;

    @ApiProperty({
        type: String,
        description: 'subject [input here api field description]',
    })
    subject: string;

    @ApiProperty({
        type: String,
        description: 'body [input here api field description]',
    })
    body: string;

    @ApiProperty({
        type: String,
        description: 'link [input here api field description]',
    })
    link?: string;

    @ApiProperty({
        type: Boolean,
        description: 'isInternalLink [input here api field description]',
    })
    isInternalLink?: boolean;

    @ApiProperty({
        type: Object,
        description: 'image [input here api field description]',
    })
    image?: any;

    @ApiProperty({
        type: String,
        description: 'icon [input here api field description]',
    })
    icon?: string;

    @ApiProperty({
        type: Object,
        description: 'attachments [input here api field description]',
    })
    attachments?: any;

    @ApiProperty({
        type: Boolean,
        description: 'isRead [input here api field description]',
    })
    isRead: boolean;

    @ApiProperty({
        type: Boolean,
        description: 'isReadAtLeastOnce [input here api field description]',
    })
    isReadAtLeastOnce: boolean;

    @ApiProperty({
        type: Object,
        description: 'meta [input here api field description]',
    })
    meta?: any;
}
