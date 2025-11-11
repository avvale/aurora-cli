/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamPaginateTenantsHandler } from '@api/iam/tenant';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[iam] tenant')
@Controller('iam/tenants/paginate')
@Auth('iam.tenant.get')
export class IamPaginateTenantsController {
    constructor(private readonly handler: IamPaginateTenantsHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate tenants' })
    @ApiOkResponse({
        description: 'The records has been paginated successfully.',
        type: Pagination,
    })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
