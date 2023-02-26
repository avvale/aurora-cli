/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamTenantDto, IamUpdateTenantsDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdateTenantsHandler } from '../handlers/iam-update-tenants.handler';

@ApiTags('[iam] tenant')
@Controller('iam/tenants/update')
@Auth('iam.tenant.update')
export class IamUpdateTenantsController
{
    constructor(
        private readonly handler: IamUpdateTenantsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update tenants' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamTenantDto })
    async main(
        @Body() payload: IamUpdateTenantsDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}