import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonDeleteLangsHandler } from '../handlers/common-delete-langs.handler';
import { CommonLang } from '../../../../graphql';

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