import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonUpsertLangHandler } from '../handlers/common-upsert-lang.handler';
import { CommonLang, CommonUpdateLangByIdInput } from '@api/graphql';

@Resolver()
export class CommonUpsertLangResolver
{
    constructor(
        private readonly handler: CommonUpsertLangHandler,
    ) {}

    @Mutation('commonUpsertLang')
    async main(
        @Args('payload') payload: CommonUpdateLangByIdInput,
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