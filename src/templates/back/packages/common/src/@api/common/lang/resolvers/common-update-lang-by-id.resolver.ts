import { CommonUpdateLangByIdHandler } from '../handlers/common-update-lang-by-id.handler';
import { CommonLang, CommonUpdateLangByIdInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.lang.update')
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
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonLang>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}