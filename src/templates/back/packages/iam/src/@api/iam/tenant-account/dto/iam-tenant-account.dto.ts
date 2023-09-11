/* eslint-disable indent */
import { IamAccountDto } from '@api/iam/account';
import { IamTenantDto } from '@api/iam/tenant';
import { ApiProperty } from '@nestjs/swagger';

export class IamTenantAccountDto
{
    @ApiProperty({
        type       : String,
        description: 'tenantId [input here api field description]',
    })
    tenantId: string;

    @ApiProperty({
        type       : () => IamTenantDto,
        description: 'IamTenant [input here api field description]',
    })
    tenant?: IamTenantDto;

    @ApiProperty({
        type       : String,
        description: 'accountId [input here api field description]',
    })
    accountId: string;

    @ApiProperty({
        type       : () => IamAccountDto,
        description: 'IamAccount [input here api field description]',
    })
    account?: IamAccountDto;

}