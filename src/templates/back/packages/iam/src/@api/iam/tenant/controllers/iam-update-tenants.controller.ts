/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamTenantDto, IamUpdateTenantsDto, IamUpdateTenantsHandler } from '@api/iam/tenant';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
