/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { IamTenantDto, IamUpdateTenantByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpsertTenantHandler } from '../handlers/iam-upsert-tenant.handler';

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