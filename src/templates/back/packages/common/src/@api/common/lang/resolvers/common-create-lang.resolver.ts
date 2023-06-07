import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonCreateLangHandler } from '../handlers/common-create-lang.handler';
import { CommonLang, CommonCreateLangInput } from '@api/graphql';

@Resolver()
@Auth('common.lang.create')
export class CommonCreateLangResolver
{
    constructor(
        private readonly handler: CommonCreateLangHandler,
    ) {}

    @Mutation('commonCreateLang')
    async main(
        @Args('payload') payload: CommonCreateLangInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonLang>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}