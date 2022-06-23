import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonUpdateLangsHandler } from '../handlers/common-update-langs.handler';
import { CommonLang, CommonUpdateLangsInput } from '../../../../graphql';

@Resolver()
export class CommonUpdateLangsResolver
{
    constructor(
        private readonly handler: CommonUpdateLangsHandler,
    ) {}

    @Mutation('commonUpdateLangs')
    async main(
        @Args('payload') payload: CommonUpdateLangsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonLang>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}