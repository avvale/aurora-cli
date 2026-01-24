import { ToolsWebhookLog } from '@api/graphql';
import { ToolsDeleteWebhookLogsHandler } from '@api/tools/webhook-log';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.webhookLog.delete')
export class ToolsDeleteWebhookLogsResolver {
  constructor(private readonly handler: ToolsDeleteWebhookLogsHandler) {}

  @Mutation('toolsDeleteWebhookLogs')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<ToolsWebhookLog[]> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
