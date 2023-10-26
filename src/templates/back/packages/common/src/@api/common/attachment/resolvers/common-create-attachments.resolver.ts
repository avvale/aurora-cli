import { CommonCreateAttachmentsHandler } from '@api/common/attachment';
import { CommonCreateAttachmentInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachment.create')
export class CommonCreateAttachmentsResolver
{
    constructor(
        private readonly handler: CommonCreateAttachmentsHandler,
    ) {}

    @Mutation('commonCreateAttachments')
    async main(
        @Args('payload') payload: CommonCreateAttachmentInput[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
