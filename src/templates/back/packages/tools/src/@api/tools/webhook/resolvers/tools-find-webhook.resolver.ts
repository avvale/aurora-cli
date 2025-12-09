import { ToolsWebhook } from '@api/graphql';
import { ToolsFindWebhookHandler } from '@api/tools/webhook';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.webhook.get')
export class ToolsFindWebhookResolver {
    constructor(private readonly handler: ToolsFindWebhookHandler) {}

    @Query('toolsFindWebhook')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<ToolsWebhook> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
