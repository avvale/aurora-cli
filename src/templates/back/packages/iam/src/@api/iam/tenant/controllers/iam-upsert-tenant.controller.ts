/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { IamTenantDto, IamUpdateTenantByIdDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpsertTenantHandler } from '../handlers/iam-upsert-tenant.handler';

@ApiTags('[iam] tenant')
@Controller('iam/tenant/upsert')
@Permissions('iam.tenant.upsert')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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