import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { CommonFindLangHandler } from '../handlers/common-find-lang.handler';
import { CommonLang } from '@api/graphql';

@Resolver()
export class CommonFindLangResolver
{
    constructor(
        private readonly handler: CommonFindLangHandler,
    ) {}

    @Query('commonFindLang')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonLang>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}