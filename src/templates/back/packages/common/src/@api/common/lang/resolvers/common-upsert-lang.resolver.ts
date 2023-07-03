import { CommonUpsertLangHandler } from '@api/common/lang';
import { CommonLang, CommonUpdateLangByIdInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.lang.upsert')
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