/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    IamCreateTenantDto,
    IamCreateTenantHandler,
    IamTenantDto,
} from '@api/iam/tenant';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tenant')
@Controller('iam/tenant/create')
@Auth('iam.tenant.create')
export class IamCreateTenantController {
    constructor(private readonly handler: IamCreateTenantHandler) {}

    @Post()
    @ApiOperation({ summary: 'Create tenant' })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: IamTenantDto,
    })
    async main(
        @Body() payload: IamCreateTenantDto,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(payload, timezone, auditing);
    }
}
