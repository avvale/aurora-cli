import { CommonDeleteLangByIdHandler } from '@api/common/lang';
import { CommonLang } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.lang.delete')
export class CommonDeleteLangByIdResolver
{
    constructor(
        private readonly handler: CommonDeleteLangByIdHandler,
    ) {}

    @Mutation('commonDeleteLangById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonLang>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}
