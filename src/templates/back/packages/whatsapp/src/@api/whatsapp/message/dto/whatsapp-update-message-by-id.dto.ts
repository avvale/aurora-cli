/* eslint-disable indent */
import { WhatsappMessageDirection, WhatsappMessageType } from '@api/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class WhatsappUpdateMessageByIdDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'wabaMessageId [input here api field description]',
    })
    wabaMessageId?: string;

    @ApiProperty({
        type       : WhatsappMessageDirection,
        enum       : ['INPUT','OUTPUT'],
        description: 'direction [input here api field description]',
    })
    direction?: WhatsappMessageDirection;

    @ApiProperty({
        type       : String,
        description: 'accountId [input here api field description]',
        example    : 'bb311dbd-dd0b-5412-bf15-ca58a8aa48db',
    })
    accountId?: string;

    @ApiProperty({
        type       : String,
        description: 'wabaContactId [input here api field description]',
    })
    wabaContactId?: string;

    @ApiProperty({
        type       : String,
        description: 'contactName [input here api field description]',
    })
    contactName?: string;

    @ApiProperty({
        type       : WhatsappMessageType,
        enum       : ['BUTTON','CONTACTS','IMAGE','INTERACTIVE','LOCATION','ORDER','REACTION','STICKER','SYSTEM','TEMPLATE','TEXT','UNKNOWN'],
        description: 'type [input here api field description]',
    })
    type?: WhatsappMessageType;

    @ApiProperty({
        type       : Object,
        description: 'payload [input here api field description]',
    })
    payload?: any;

}
