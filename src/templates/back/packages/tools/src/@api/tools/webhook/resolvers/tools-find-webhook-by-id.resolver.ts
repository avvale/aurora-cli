import { ToolsWebhook } from '@api/graphql';
import { ToolsFindWebhookByIdHandler } from '@api/tools/webhook';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.webhook.get')
export class ToolsFindWebhookByIdResolver {
    constructor(private readonly handler: ToolsFindWebhookByIdHandler) {}

    @Query('toolsFindWebhookById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<ToolsWebhook> {
        return await this.handler.main(id, constraint, timezone);
    }
}
