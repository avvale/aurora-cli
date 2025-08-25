/* eslint-disable indent */
import { WhatsappMessageDirection, WhatsappMessageType } from '@api/graphql';
import { IamAccountDto } from '@api/iam/account';
import { WhatsappConversationDto } from '@api/whatsapp/conversation';
import { WhatsappTimelineDto } from '@api/whatsapp/timeline';
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
        description: 'wabaMessageId [input here api field description]',
    })
    wabaMessageId: string;

    @ApiProperty({
        type       : String,
        description: 'timelineId [input here api field description]',
        example    : 'e3d69519-5187-5a8a-8bdc-ca03ec3bfcdd',
    })
    timelineId: string;

    @ApiProperty({
        type       : () => WhatsappTimelineDto,
        description: 'WhatsappTimeline [input here api field description]',
    })
    timeline?: WhatsappTimelineDto;

    @ApiProperty({
        type       : String,
        description: 'conversationId [input here api field description]',
        example    : 'cb32e229-229b-59bd-b4ba-db9fc1090029',
    })
    conversationId?: string;

    @ApiProperty({
        type       : () => WhatsappConversationDto,
        description: 'WhatsappConversation [input here api field description]',
    })
    conversation?: WhatsappConversationDto;

    @ApiProperty({
        type       : Array,
        description: 'statuses [input here api field description]',
    })
    statuses: string[];

    @ApiProperty({
        enum       : WhatsappMessageDirection,
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
        description: 'wabaContactId [input here api field description]',
    })
    wabaContactId: string;

    @ApiProperty({
        type       : String,
        description: 'contactName [input here api field description]',
    })
    contactName?: string;

    @ApiProperty({
        enum       : WhatsappMessageType,
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
