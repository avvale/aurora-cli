/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { IamTenantDto, IamCreateTenantDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamCreateTenantHandler } from '../handlers/iam-create-tenant.handler';

@ApiTags('[iam] tenant')
@Controller('iam/tenant/create')
@Permissions('iam.tenant.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamCreateTenantController
{
    constructor(
        private readonly handler: IamCreateTenantHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create tenant' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: IamTenantDto })
    async main(
        @Body() payload: IamCreateTenantDto,
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