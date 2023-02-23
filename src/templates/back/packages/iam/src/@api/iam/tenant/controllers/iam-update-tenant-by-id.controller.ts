/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamTenantDto, IamUpdateTenantByIdDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdateTenantByIdHandler } from '../handlers/iam-update-tenant-by-id.handler';

@ApiTags('[iam] tenant')
@Controller('iam/tenant/update')
@Permissions('iam.tenant.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpdateTenantByIdController
{
    constructor(
        private readonly handler: IamUpdateTenantByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update tenant by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamTenantDto })
    async main(
        @Body() payload: IamUpdateTenantByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}