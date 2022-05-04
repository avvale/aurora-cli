/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamTenantDto } from '../dto';

// @apps
import { IamDeleteTenantsHandler } from '../handlers/iam-delete-tenants.handler';

@ApiTags('[iam] tenant')
@Controller('iam/tenants/delete')
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
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}