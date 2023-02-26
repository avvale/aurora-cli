import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamPaginateUsersHandler } from '../handlers/iam-paginate-users.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Auth('iam.user.get')
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