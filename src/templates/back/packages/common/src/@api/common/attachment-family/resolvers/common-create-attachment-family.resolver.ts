import { CommonCreateAttachmentFamilyHandler } from '@api/common/attachment-family';
import { CommonAttachmentFamily, CommonCreateAttachmentFamilyInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachmentFamily.create')
export class CommonCreateAttachmentFamilyResolver
{
    constructor(
        private readonly handler: CommonCreateAttachmentFamilyHandler,
    ) {}

    @Mutation('commonCreateAttachmentFamily')
    async main(
        @Args('payload') payload: CommonCreateAttachmentFamilyInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAttachmentFamily>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
