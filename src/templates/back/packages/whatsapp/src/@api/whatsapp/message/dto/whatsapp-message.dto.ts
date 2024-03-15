/* eslint-disable indent */
import { WhatsappMessageDirection, WhatsappMessageType } from '@api/graphql';
import { IamAccountDto } from '@api/iam/account';
import { WhatsappConversationDto } from '@api/whatsapp/conversation';
import { ApiProperty } from '@nestjs/swagger';

export class WhatsappMessageDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'whatsappMessageId [input here api field description]',
    })
    whatsappMessageId: string;

    @ApiProperty({
        type       : String,
        description: 'conversationId [input here api field description]',
        example    : 'cb32e229-229b-59bd-b4ba-db9fc1090029',
    })
    conversationId: string;

    @ApiProperty({
        type       : () => WhatsappConversationDto,
        description: 'WhatsappConversation [input here api field description]',
    })
    conversation?: WhatsappConversationDto;

    @ApiProperty({
        type       : WhatsappMessageDirection,
        enum       : ['INPUT','OUTPUT'],
        description: 'direction [input here api field description]',
    })
    direction: WhatsappMessageDirection;

    @ApiProperty({
        type       : String,
        description: 'accountId [input here api field description]',
        example    : 'bb311dbd-dd0b-5412-bf15-ca58a8aa48db',
    })
    accountId?: string;

    @ApiProperty({
        type       : () => IamAccountDto,
        description: 'accountId [input here api field description]',
    })
    account?: IamAccountDto;

    @ApiProperty({
        type       : String,
        description: 'displayPhoneNumber [input here api field description]',
    })
    displayPhoneNumber: string;

    @ApiProperty({
        type       : String,
        description: 'phoneNumberId [input here api field description]',
    })
    phoneNumberId: string;

    @ApiProperty({
        type       : WhatsappMessageType,
        enum       : ['TEMPLATE','REACTION','IMAGE','LOCATION','CONTACTS','INTERACTIVE','TEXT'],
        description: 'type [input here api field description]',
    })
    type: WhatsappMessageType;

    @ApiProperty({
        type       : Object,
        description: 'payload [input here api field description]',
    })
    payload: any;

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
