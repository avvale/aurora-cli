import { ToolsKeyValue } from '@api/graphql';
import { ToolsDeleteKeyValueByIdHandler } from '@api/tools/key-value';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.keyValue.delete')
export class ToolsDeleteKeyValueByIdResolver
{
    constructor(
        private readonly handler: ToolsDeleteKeyValueByIdHandler,
    ) {}

    @Mutation('toolsDeleteKeyValueById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<ToolsKeyValue>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}
