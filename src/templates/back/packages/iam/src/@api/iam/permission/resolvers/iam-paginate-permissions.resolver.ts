import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamPaginatePermissionsHandler } from '../handlers/iam-paginate-permissions.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Auth('iam.permission.get')
export class IamPaginatePermissionsResolver
{
    constructor(
        private readonly handler: IamPaginatePermissionsHandler,
    ) {}

    @Query('iamPaginatePermissions')
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