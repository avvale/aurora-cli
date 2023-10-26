import { CommonUpdateAttachmentByIdHandler } from '@api/common/attachment';
import { CommonAttachment, CommonUpdateAttachmentByIdInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachment.update')
export class CommonUpdateAttachmentByIdResolver
{
    constructor(
        private readonly handler: CommonUpdateAttachmentByIdHandler,
    ) {}

    @Mutation('commonUpdateAttachmentById')
    async main(
        @Args('payload') payload: CommonUpdateAttachmentByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAttachment>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}
