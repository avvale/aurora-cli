import { ToolsWebhookLog } from '@api/graphql';
import { ToolsFindWebhookLogByIdHandler } from '@api/tools/webhook-log';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.webhookLog.get')
export class ToolsFindWebhookLogByIdResolver {
  constructor(private readonly handler: ToolsFindWebhookLogByIdHandler) {}

  @Query('toolsFindWebhookLogById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<ToolsWebhookLog> {
    return await this.handler.main(id, constraint, timezone);
  }
}
