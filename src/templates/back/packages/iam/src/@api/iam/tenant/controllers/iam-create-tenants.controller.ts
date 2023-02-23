/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { IamTenantDto, IamCreateTenantDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamCreateTenantsHandler } from '../handlers/iam-create-tenants.handler';

@ApiTags('[iam] tenant')
@Controller('iam/tenants/create')
@Permissions('iam.tenant.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamCreateTenantsController
{
    constructor(
        private readonly handler: IamCreateTenantsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create tenants in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [IamTenantDto]})
    @ApiBody({ type: [IamCreateTenantDto]})
    async main(
        @Body() payload: IamCreateTenantDto[],
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