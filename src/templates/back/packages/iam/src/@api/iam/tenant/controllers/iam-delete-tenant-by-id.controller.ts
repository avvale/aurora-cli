/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamTenantDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeleteTenantByIdHandler } from '../handlers/iam-delete-tenant-by-id.handler';

@ApiTags('[iam] tenant')
@Controller('iam/tenant/delete')
@Permissions('iam.tenant.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamDeleteTenantByIdController
{
    constructor(
        private readonly handler: IamDeleteTenantByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete tenant by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: IamTenantDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}