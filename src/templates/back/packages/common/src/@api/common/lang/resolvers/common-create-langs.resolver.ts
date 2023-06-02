import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonCreateLangsHandler } from '../handlers/common-create-langs.handler';
import { CommonCreateLangInput } from '@api/graphql';

@Resolver()
export class CommonCreateLangsResolver
{
    constructor(
        private readonly handler: CommonCreateLangsHandler,
    ) {}

    @Mutation('commonCreateLangs')
    async main(
        @Args('payload') payload: CommonCreateLangInput[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}