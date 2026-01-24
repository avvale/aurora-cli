import { ToolsWebhookLog } from '@api/graphql';
import { ToolsDeleteWebhookLogByIdHandler } from '@api/tools/webhook-log';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.webhookLog.delete')
export class ToolsDeleteWebhookLogByIdResolver {
  constructor(private readonly handler: ToolsDeleteWebhookLogByIdHandler) {}

  @Mutation('toolsDeleteWebhookLogById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<ToolsWebhookLog> {
    return await this.handler.main(id, constraint, timezone);
  }
}
