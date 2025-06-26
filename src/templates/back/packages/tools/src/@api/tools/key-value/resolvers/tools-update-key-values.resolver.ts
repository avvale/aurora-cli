import { ToolsKeyValue, ToolsUpdateKeyValuesInput } from '@api/graphql';
import { ToolsUpdateKeyValuesHandler } from '@api/tools/key-value';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.keyValue.update')
export class ToolsUpdateKeyValuesResolver
{
    constructor(
        private readonly handler: ToolsUpdateKeyValuesHandler,
    ) {}

    @Mutation('toolsUpdateKeyValues')
    async main(
        @Args('payload') payload: ToolsUpdateKeyValuesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<ToolsKeyValue>
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
