/* eslint-disable indent */
import { IamAccountDto } from '@api/iam/account';
import { IamTenantDto } from '@api/iam/tenant';
import { ApiProperty } from '@nestjs/swagger';

export class IamTenantAccountDto
{
    @ApiProperty({
        type       : String,
        description: 'tenantId [input here api field description]',
        example    : 'a41bef10-c602-5bd6-a750-befbedc2becb',
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
        example    : 'bb311dbd-dd0b-5412-bf15-ca58a8aa48db',
    })
    accountId: string;

    @ApiProperty({
        type       : () => IamAccountDto,
        description: 'IamAccount [input here api field description]',
    })
    account?: IamAccountDto;

}
