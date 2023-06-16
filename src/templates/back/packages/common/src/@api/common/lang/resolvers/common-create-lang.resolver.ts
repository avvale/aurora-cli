import { CommonCreateLangHandler } from '../handlers/common-create-lang.handler';
import { CommonCreateLangInput, CommonLang } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

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