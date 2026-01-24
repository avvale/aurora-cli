import { ToolsCreateWebhookInput } from '@api/graphql';
import { ToolsCreateWebhooksHandler } from '@api/tools/webhook';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.webhook.create')
export class ToolsCreateWebhooksResolver {
  constructor(private readonly handler: ToolsCreateWebhooksHandler) {}

  @Mutation('toolsCreateWebhooks')
  async main(
    @Args('payload') payload: ToolsCreateWebhookInput[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<boolean> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
