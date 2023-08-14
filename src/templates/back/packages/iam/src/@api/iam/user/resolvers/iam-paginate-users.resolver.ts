import { Pagination } from '@api/graphql';
import { IamPaginateUsersHandler } from '@api/iam/user';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

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
