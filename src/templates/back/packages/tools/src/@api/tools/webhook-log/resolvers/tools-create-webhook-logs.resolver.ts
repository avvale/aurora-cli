import { ToolsCreateWebhookLogInput } from '@api/graphql';
import { ToolsCreateWebhookLogsHandler } from '@api/tools/webhook-log';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.webhookLog.create')
export class ToolsCreateWebhookLogsResolver {
    constructor(private readonly handler: ToolsCreateWebhookLogsHandler) {}

    @Mutation('toolsCreateWebhookLogs')
    async main(
        @Args('payload') payload: ToolsCreateWebhookLogInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean> {
        return await this.handler.main(payload, timezone);
    }
}
