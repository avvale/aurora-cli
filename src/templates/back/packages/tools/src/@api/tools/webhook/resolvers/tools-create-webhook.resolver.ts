import { ToolsCreateWebhookInput, ToolsWebhook } from '@api/graphql';
import { ToolsCreateWebhookHandler } from '@api/tools/webhook';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.webhook.create')
export class ToolsCreateWebhookResolver {
  constructor(private readonly handler: ToolsCreateWebhookHandler) {}

  @Mutation('toolsCreateWebhook')
  async main(
    @Args('payload') payload: ToolsCreateWebhookInput,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<ToolsWebhook> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
