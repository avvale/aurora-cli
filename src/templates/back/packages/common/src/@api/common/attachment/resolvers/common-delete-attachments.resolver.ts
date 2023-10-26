import { CommonDeleteAttachmentsHandler } from '@api/common/attachment';
import { CommonAttachment } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachment.delete')
export class CommonDeleteAttachmentsResolver
{
    constructor(
        private readonly handler: CommonDeleteAttachmentsHandler,
    ) {}

    @Mutation('commonDeleteAttachments')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAttachment[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
