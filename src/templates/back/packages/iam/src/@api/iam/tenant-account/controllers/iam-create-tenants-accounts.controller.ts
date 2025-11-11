/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    IamCreateTenantAccountDto,
    IamCreateTenantsAccountsHandler,
    IamTenantAccountDto,
} from '@api/iam/tenant-account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[iam] tenant-account')
@Controller('iam/tenants-accounts/create')
@Auth('iam.tenantAccount.create')
export class IamCreateTenantsAccountsController {
    constructor(private readonly handler: IamCreateTenantsAccountsHandler) {}

    @Post()
    @ApiOperation({ summary: 'Create tenants-accounts in batch' })
    @ApiCreatedResponse({
        description: 'The records has been created successfully.',
        type: [IamTenantAccountDto],
    })
    @ApiBody({ type: [IamCreateTenantAccountDto] })
    async main(
        @Body() payload: IamCreateTenantAccountDto[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(payload, timezone, auditing);
    }
}
