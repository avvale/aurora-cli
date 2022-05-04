import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamPaginateRolesHandler } from '../handlers/iam-paginate-roles.handler';
import { Pagination } from '../../../../graphql';

@Resolver()
export class IamPaginateRolesResolver
{
    constructor(
        private readonly handler: IamPaginateRolesHandler,
    ) {}

    @Query('iamPaginateRoles')
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