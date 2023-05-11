import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamPaginateRolesHandler } from '../handlers/iam-paginate-roles.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Auth('iam.role.get')
export class IamPaginateRolesResolver
{
    constructor(
        private readonly handler: IamPaginateRolesHandler,
    ) {}

    @Query('iamPaginateRoles')
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