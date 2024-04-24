/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class WhatsappUpdateConversationsDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id?: string;

    @ApiProperty({
        type       : String,
        description: 'wabaConversationId [input here api field description]',
    })
    wabaConversationId?: string;

    @ApiProperty({
        type       : String,
        description: 'timelineId [input here api field description]',
        example    : 'e3d69519-5187-5a8a-8bdc-ca03ec3bfcdd',
    })
    timelineId?: string;

    @ApiProperty({
        type       : String,
        description: 'wabaContactId [input here api field description]',
    })
    wabaContactId?: string;

    @ApiProperty({
        type       : String,
        description: 'expiration [input here api field description]',
    })
    expiration?: string;

    @ApiProperty({
        type       : String,
        description: 'category [input here api field description]',
    })
    category?: string;

    @ApiProperty({
        type       : Boolean,
        description: 'isBillable [input here api field description]',
    })
    isBillable?: boolean;

    @ApiProperty({
        type       : String,
        description: 'pricingModel [input here api field description]',
    })
    pricingModel?: string;

}
