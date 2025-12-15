import { Pagination } from '@api/graphql';
import { ToolsPaginateWebhookLogsHandler } from '@api/tools/webhook-log';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.webhookLog.get')
export class ToolsPaginateWebhookLogsResolver {
    constructor(private readonly handler: ToolsPaginateWebhookLogsHandler) {}

    @Query('toolsPaginateWebhookLogs')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
