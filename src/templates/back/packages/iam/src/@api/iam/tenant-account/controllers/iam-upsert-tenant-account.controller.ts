/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamTenantAccountDto, IamUpdateTenantAccountByIdDto, IamUpsertTenantAccountHandler } from '@api/iam/tenant-account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tenant-account')
@Controller('iam/tenant-account/upsert')
@Auth('iam.tenantAccount.upsert')
export class IamUpsertTenantAccountController
{
    constructor(
        private readonly handler: IamUpsertTenantAccountHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert tenant-account' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: IamTenantAccountDto })
    async main(
        @Body() payload: IamUpdateTenantAccountByIdDto,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
