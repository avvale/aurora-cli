import { CommonFindLangByIdHandler } from '../handlers/common-find-lang-by-id.handler';
import { CommonLang } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

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