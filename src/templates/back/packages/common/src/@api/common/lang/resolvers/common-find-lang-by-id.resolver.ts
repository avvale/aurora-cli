import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonFindLangByIdHandler } from '../handlers/common-find-lang-by-id.handler';
import { CommonLang } from '@api/graphql';

@Resolver()
@Auth('common.lang.get')
export class CommonFindLangByIdResolver
{
    constructor(
        private readonly handler: CommonFindLangByIdHandler,
    ) {}

    @Query('commonFindLangById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonLang>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}