import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamPaginateUsersHandler } from '../handlers/iam-paginate-users.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Permissions('iam.user.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamPaginateUsersResolver
{
    constructor(
        private readonly handler: IamPaginateUsersHandler,
    ) {}

    @Query('iamPaginateUsers')
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