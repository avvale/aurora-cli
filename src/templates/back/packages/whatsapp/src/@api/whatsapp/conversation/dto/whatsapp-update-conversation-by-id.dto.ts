/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class WhatsappUpdateConversationByIdDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : Array,
        description: 'accounts [input here api field description]',
    })
    accounts?: string[];

}
