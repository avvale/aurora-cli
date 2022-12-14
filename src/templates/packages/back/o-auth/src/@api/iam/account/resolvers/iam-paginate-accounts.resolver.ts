import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamPaginateAccountsHandler } from '../handlers/iam-paginate-accounts.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Permissions('iam.account.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamPaginateAccountsResolver
{
    constructor(
        private readonly handler: IamPaginateAccountsHandler,
    ) {}

    @Query('iamPaginateAccounts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}