/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class MessageUpdateInboxSettingsDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id?: string;

    @ApiProperty({
        type       : String,
        description: 'accountId [input here api field description]',
    })
    accountId?: string;

    @ApiProperty({
        type       : Number,
        description: 'sort [input here api field description]',
    })
    sort?: number;

}
