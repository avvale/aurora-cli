/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamUpdateTenantAccountByIdDto
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
