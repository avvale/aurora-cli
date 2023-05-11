import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonUpdateLangByIdHandler } from '../handlers/common-update-lang-by-id.handler';
import { CommonLang, CommonUpdateLangByIdInput } from '@api/graphql';

@Resolver()
export class CommonUpdateLangByIdResolver
{
    constructor(
        private readonly handler: CommonUpdateLangByIdHandler,
    ) {}

    @Mutation('commonUpdateLangById')
    async main(
        @Args('payload') payload: CommonUpdateLangByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonLang>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}