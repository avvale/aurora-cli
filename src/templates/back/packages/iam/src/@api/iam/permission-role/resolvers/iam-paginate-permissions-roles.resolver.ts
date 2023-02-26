import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamPaginatePermissionsRolesHandler } from '../handlers/iam-paginate-permissions-roles.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Auth('iam.role.get')
export class IamPaginatePermissionsRolesResolver
{
    constructor(
        private readonly handler: IamPaginatePermissionsRolesHandler,
    ) {}

    @Query('iamPaginatePermissionsRoles')
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