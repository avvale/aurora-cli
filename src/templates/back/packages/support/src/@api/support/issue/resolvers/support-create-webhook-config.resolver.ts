import { ToolsWebhook } from '@api/graphql';
import { SupportCreateWebhookConfigHandler } from '@api/support/issue';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('support.issue.update')
export class SupportCreateWebhookConfigResolver {
    constructor(private readonly handler: SupportCreateWebhookConfigHandler) {}

    @Mutation('supportCreateWebhookConfig')
    async main(
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<ToolsWebhook> {
        return await this.handler.main(timezone, auditing);
    }
}
