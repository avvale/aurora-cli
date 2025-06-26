import { ToolsCreateKeyValueInput } from '@api/graphql';
import { ToolsCreateKeyValuesHandler } from '@api/tools/key-value';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.keyValue.create')
export class ToolsCreateKeyValuesResolver
{
    constructor(
        private readonly handler: ToolsCreateKeyValuesHandler,
    ) {}

    @Mutation('toolsCreateKeyValues')
    async main(
        @Args('payload') payload: ToolsCreateKeyValueInput[],
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
