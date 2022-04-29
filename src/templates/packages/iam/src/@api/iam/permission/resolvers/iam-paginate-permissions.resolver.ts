import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamPaginatePermissionsHandler } from '../handlers/iam-paginate-permissions.handler';
import { Pagination } from '../../../../graphql';

@Resolver()
export class IamPaginatePermissionsResolver
{
    constructor(
        private readonly handler: IamPaginatePermissionsHandler,
    ) {}

    @Query('iamPaginatePermissions')
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