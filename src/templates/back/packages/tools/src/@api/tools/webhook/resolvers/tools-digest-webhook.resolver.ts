import { ToolsDigestWebhookHandler } from '@api/tools/webhook';
import { GqlHeaders, GqlRequest } from '@aurora/decorators';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';

@Resolver()
export class ToolsDigestWebhookResolver {
    constructor(private readonly handler: ToolsDigestWebhookHandler) {}

    @Mutation('toolsDigestWebhook')
    async main(
        @GqlRequest() request: Request,
        @GqlHeaders() headers: any,
        @Args('payload') payload: any,
    ): Promise<boolean> {
        return await this.handler.main(request, headers, payload);
    }
}
