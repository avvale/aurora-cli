/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    IamFindTenantAccountHandler,
    IamTenantAccountDto,
} from '@api/iam/tenant-account';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[iam] tenant-account')
@Controller('iam/tenant-account/find')
@Auth('iam.tenantAccount.get')
export class IamFindTenantAccountController {
    constructor(private readonly handler: IamFindTenantAccountHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find tenant-account according to query' })
    @ApiOkResponse({
        description: 'The record has been successfully created.',
        type: IamTenantAccountDto,
    })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
