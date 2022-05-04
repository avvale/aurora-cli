import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamPaginateUsersHandler } from '../handlers/iam-paginate-users.handler';
import { Pagination } from '../../../../graphql';

@Resolver()
export class IamPaginateUsersResolver
{
    constructor(
        private readonly handler: IamPaginateUsersHandler,
    ) {}

    @Query('iamPaginateUsers')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
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