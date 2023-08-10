/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamGetTenantsHandler, IamTenantDto } from '@api/iam/tenant';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tenant')
@Controller('iam/tenants/get')
@Auth('iam.tenant.get')
export class IamGetTenantsController
{
    constructor(
        private readonly handler: IamGetTenantsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get tenants according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [IamTenantDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
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
