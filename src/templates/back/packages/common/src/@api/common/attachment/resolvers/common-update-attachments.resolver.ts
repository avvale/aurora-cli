import { CommonUpdateAttachmentsHandler } from '@api/common/attachment';
import { CommonAttachment, CommonUpdateAttachmentsInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachment.update')
export class CommonUpdateAttachmentsResolver
{
    constructor(
        private readonly handler: CommonUpdateAttachmentsHandler,
    ) {}

    @Mutation('commonUpdateAttachments')
    async main(
        @Args('payload') payload: CommonUpdateAttachmentsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAttachment>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
