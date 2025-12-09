/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class MessageUpdateMessageByIdDto {
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
        type: String,
        description: 'sendAt [input here api field description]',
    })
    sendAt?: string;

    @ApiProperty({
        type: Boolean,
        description: 'isImportant [input here api field description]',
    })
    isImportant?: boolean;

    @ApiProperty({
        type: String,
        description: 'subject [input here api field description]',
    })
    subject?: string;

    @ApiProperty({
        type: String,
        description: 'body [input here api field description]',
    })
    body?: string;

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
        type: Array,
        description: 'attachments [input here api field description]',
    })
    attachmentsInputFile?: any[];

    @ApiProperty({
        type: Object,
        description: 'meta [input here api field description]',
    })
    meta?: any;
}
