import { CommonGetAttachmentsHandler } from '@api/common/attachment';
import { CommonAttachment } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachment.get')
export class CommonGetAttachmentsResolver
{
    constructor(
        private readonly handler: CommonGetAttachmentsHandler,
    ) {}

    @Query('commonGetAttachments')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAttachment[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
