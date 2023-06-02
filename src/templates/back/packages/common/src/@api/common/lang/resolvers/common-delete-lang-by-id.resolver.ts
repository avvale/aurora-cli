import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonDeleteLangByIdHandler } from '../handlers/common-delete-lang-by-id.handler';
import { CommonLang } from '@api/graphql';

@Resolver()
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