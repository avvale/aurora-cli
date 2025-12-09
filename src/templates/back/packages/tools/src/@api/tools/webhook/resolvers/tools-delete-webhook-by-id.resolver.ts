import { ToolsWebhook } from '@api/graphql';
import { ToolsDeleteWebhookByIdHandler } from '@api/tools/webhook';
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
export class ToolsDeleteWebhookByIdResolver {
    constructor(private readonly handler: ToolsDeleteWebhookByIdHandler) {}

    @Mutation('toolsDeleteWebhookById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<ToolsWebhook> {
        return await this.handler.main(id, constraint, timezone, auditing);
    }
}
