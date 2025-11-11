/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamCreateTenantAccountDto {
    @ApiProperty({
        type: String,
        description: 'tenantId [input here api field description]',
        example: 'a41bef10-c602-5bd6-a750-befbedc2becb',
    })
    tenantId: string;

    @ApiProperty({
        type: String,
        description: 'accountId [input here api field description]',
        example: 'bb311dbd-dd0b-5412-bf15-ca58a8aa48db',
    })
    accountId: string;
}
