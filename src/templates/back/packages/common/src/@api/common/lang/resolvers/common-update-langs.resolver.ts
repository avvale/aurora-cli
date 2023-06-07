import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonUpdateLangsHandler } from '../handlers/common-update-langs.handler';
import { CommonLang, CommonUpdateLangsInput } from '@api/graphql';

@Resolver()
@Auth('common.lang.update')
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
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonLang>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}