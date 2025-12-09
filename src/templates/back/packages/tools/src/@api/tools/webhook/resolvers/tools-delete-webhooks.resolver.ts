import { ToolsWebhook } from '@api/graphql';
import { ToolsDeleteWebhooksHandler } from '@api/tools/webhook';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.webhook.delete')
export class ToolsDeleteWebhooksResolver {
    constructor(private readonly handler: ToolsDeleteWebhooksHandler) {}

    @Mutation('toolsDeleteWebhooks')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<ToolsWebhook[]> {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
