import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonGetLangsHandler } from '../handlers/common-get-langs.handler';
import { CommonLang } from '@api/graphql';

@Resolver()
@Auth('common.lang.get')
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