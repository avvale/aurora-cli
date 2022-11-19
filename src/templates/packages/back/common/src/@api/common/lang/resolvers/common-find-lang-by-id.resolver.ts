import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonFindLangByIdHandler } from '../handlers/common-find-lang-by-id.handler';
import { CommonLang } from '@api/graphql';

@Resolver()
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