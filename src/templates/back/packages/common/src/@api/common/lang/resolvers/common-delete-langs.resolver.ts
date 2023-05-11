import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonDeleteLangsHandler } from '../handlers/common-delete-langs.handler';
import { CommonLang } from '@api/graphql';

@Resolver()
export class CommonDeleteLangsResolver
{
    constructor(
        private readonly handler: CommonDeleteLangsHandler,
    ) {}

    @Mutation('commonDeleteLangs')
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