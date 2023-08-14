import { Pagination } from '@api/graphql';
import { IamPaginatePermissionsHandler } from '@api/iam/permission';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

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
