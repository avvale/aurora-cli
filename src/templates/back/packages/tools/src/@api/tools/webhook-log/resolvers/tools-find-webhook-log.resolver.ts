import { ToolsWebhookLog } from '@api/graphql';
import { ToolsFindWebhookLogHandler } from '@api/tools/webhook-log';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.webhookLog.get')
export class ToolsFindWebhookLogResolver {
    constructor(private readonly handler: ToolsFindWebhookLogHandler) {}

    @Query('toolsFindWebhookLog')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<ToolsWebhookLog> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
