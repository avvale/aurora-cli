/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamTenantDto, IamUpdateTenantByIdDto, IamUpsertTenantHandler } from '@api/iam/tenant';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tenant')
@Controller('iam/tenant/upsert')
@Auth('iam.tenant.upsert')
export class IamUpsertTenantController
{
    constructor(
        private readonly handler: IamUpsertTenantHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert tenant' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: IamTenantDto })
    async main(
        @Body() payload: IamUpdateTenantByIdDto,
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
