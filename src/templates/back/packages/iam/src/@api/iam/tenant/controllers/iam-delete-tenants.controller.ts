/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamTenantDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeleteTenantsHandler } from '../handlers/iam-delete-tenants.handler';

@ApiTags('[iam] tenant')
@Controller('iam/tenants/delete')
@Auth('iam.tenant.delete')
export class IamDeleteTenantsController
{
    constructor(
        private readonly handler: IamDeleteTenantsHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete tenants in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [IamTenantDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}