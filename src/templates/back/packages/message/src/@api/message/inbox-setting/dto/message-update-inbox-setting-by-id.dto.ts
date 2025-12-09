/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class MessageUpdateInboxSettingByIdDto {
    @ApiProperty({
        type: String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type: String,
        description: 'accountId [input here api field description]',
    })
    accountId?: string;

    @ApiProperty({
        type: Number,
        description: 'lastReadMessageRowId [input here api field description]',
    })
    lastReadMessageRowId?: number;
}
