import { ToolsUpdateWebhookByIdInput, ToolsWebhook } from '@api/graphql';
import { ToolsUpdateWebhookByIdHandler } from '@api/tools/webhook';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.webhook.update')
export class ToolsUpdateWebhookByIdResolver {
    constructor(private readonly handler: ToolsUpdateWebhookByIdHandler) {}

    @Mutation('toolsUpdateWebhookById')
    async main(
        @Args('payload') payload: ToolsUpdateWebhookByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<ToolsWebhook> {
        return await this.handler.main(payload, constraint, timezone, auditing);
    }
}
