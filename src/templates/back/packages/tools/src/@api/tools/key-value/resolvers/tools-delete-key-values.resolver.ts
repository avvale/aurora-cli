import { ToolsKeyValue } from '@api/graphql';
import { ToolsDeleteKeyValuesHandler } from '@api/tools/key-value';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.keyValue.delete')
export class ToolsDeleteKeyValuesResolver
{
    constructor(
        private readonly handler: ToolsDeleteKeyValuesHandler,
    ) {}

    @Mutation('toolsDeleteKeyValues')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<ToolsKeyValue[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
