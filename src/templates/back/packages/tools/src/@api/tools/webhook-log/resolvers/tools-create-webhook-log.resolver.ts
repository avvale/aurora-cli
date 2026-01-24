import { ToolsCreateWebhookLogInput, ToolsWebhookLog } from '@api/graphql';
import { ToolsCreateWebhookLogHandler } from '@api/tools/webhook-log';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.webhookLog.create')
export class ToolsCreateWebhookLogResolver {
  constructor(private readonly handler: ToolsCreateWebhookLogHandler) {}

  @Mutation('toolsCreateWebhookLog')
  async main(
    @Args('payload') payload: ToolsCreateWebhookLogInput,
    @Timezone() timezone?: string,
  ): Promise<ToolsWebhookLog> {
    return await this.handler.main(payload, timezone);
  }
}
