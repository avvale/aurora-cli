/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamPaginateAccountsHandler } from '@api/iam/account';
import { Auth } from '@aurora/decorators';
import { CurrentAccount, Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TenantConstraint } from '@api/iam/shared';
import { IamAccountResponse } from '@app/iam/account';

@ApiTags('[iam] account')
@Controller('iam/accounts/paginate-with-tenant-constraint')
@Auth('iam.account.get')
export class IamPaginateWithTenantConstraintAccountsController
{
    constructor(
        private readonly handler: IamPaginateAccountsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate accounts filtered by the tenants of the user consuming the API' })
    @ApiCreatedResponse({ description: 'Defines the action performed', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
    @TenantConstraint({
        targetProperty: 'dTenants',
    })
    async main(
        @CurrentAccount() account: IamAccountResponse,
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