import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonPaginateLangsHandler } from '../handlers/common-paginate-langs.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Auth('common.lang.get')
export class CommonPaginateLangsResolver
{
    constructor(
        private readonly handler: CommonPaginateLangsHandler,
    ) {}

    @Query('commonPaginateLangs')
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