import { SupportDeleteWebhookConfigHandler } from '@api/support/issue';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('support.issue.update')
export class SupportDeleteWebhookConfigResolver {
    constructor(private readonly handler: SupportDeleteWebhookConfigHandler) {}

    @Mutation('supportDeleteWebhookConfig')
    async main(
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean> {
        return await this.handler.main(timezone, auditing);
    }
}
