/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamCreateTenantAccountDto
{
    @ApiProperty({
        type       : String,
        description: 'tenantId [input here api field description]',
    })
    tenantId: string;

    @ApiProperty({
        type       : String,
        description: 'accountId [input here api field description]',
    })
    accountId: string;

}
