import { ToolsUpdateWebhookLogByIdInput, ToolsWebhookLog } from '@api/graphql';
import { ToolsUpdateWebhookLogByIdHandler } from '@api/tools/webhook-log';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.webhookLog.update')
export class ToolsUpdateWebhookLogByIdResolver {
    constructor(private readonly handler: ToolsUpdateWebhookLogByIdHandler) {}

    @Mutation('toolsUpdateWebhookLogById')
    async main(
        @Args('payload') payload: ToolsUpdateWebhookLogByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<ToolsWebhookLog> {
        return await this.handler.main(payload, constraint, timezone);
    }
}
