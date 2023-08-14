import { CommonGetLangsHandler } from '@api/common/lang';
import { CommonLang } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

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
