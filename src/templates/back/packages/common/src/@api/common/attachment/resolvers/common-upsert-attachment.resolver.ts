import { CommonUpsertAttachmentHandler } from '@api/common/attachment';
import { CommonAttachment, CommonUpdateAttachmentByIdInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachment.upsert')
export class CommonUpsertAttachmentResolver
{
    constructor(
        private readonly handler: CommonUpsertAttachmentHandler,
    ) {}

    @Mutation('commonUpsertAttachment')
    async main(
        @Args('payload') payload: CommonUpdateAttachmentByIdInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAttachment>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
