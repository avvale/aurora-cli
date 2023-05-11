import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonGetLangsHandler } from '../handlers/common-get-langs.handler';
import { CommonLang } from '@api/graphql';

@Resolver()
export class CommonGetLangsResolver
{
    constructor(
        private readonly handler: CommonGetLangsHandler,
    ) {}

    @Query('commonGetLangs')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonLang[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}