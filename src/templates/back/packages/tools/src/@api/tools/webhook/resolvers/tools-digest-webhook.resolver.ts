import { ToolsDigestWebhookHandler } from '@api/tools/webhook';
import { GqlHeaders } from '@aurora/decorators';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class ToolsDigestWebhookResolver {
    constructor(private readonly handler: ToolsDigestWebhookHandler) {}

    @Mutation('toolsDigestWebhook')
    async main(
        @GqlHeaders() headers: any,
        @Args('payload') payload: any,
    ): Promise<boolean> {
        return await this.handler.main(headers, payload);
    }
}
