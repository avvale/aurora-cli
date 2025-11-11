/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    IamCreateTenantAccountDto,
    IamCreateTenantAccountHandler,
    IamTenantAccountDto,
} from '@api/iam/tenant-account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tenant-account')
@Controller('iam/tenant-account/create')
@Auth('iam.tenantAccount.create')
export class IamCreateTenantAccountController {
    constructor(private readonly handler: IamCreateTenantAccountHandler) {}

    @Post()
    @ApiOperation({ summary: 'Create tenant-account' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: IamTenantAccountDto,
    })
    async main(
        @Body() payload: IamCreateTenantAccountDto,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(payload, timezone, auditing);
    }
}
