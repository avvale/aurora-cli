import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamPaginateBoundedContextsHandler } from '../handlers/iam-paginate-bounded-contexts.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Auth('iam.boundedContext.get')
export class IamPaginateBoundedContextsResolver
{
    constructor(
        private readonly handler: IamPaginateBoundedContextsHandler,
    ) {}

    @Query('iamPaginateBoundedContexts')
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