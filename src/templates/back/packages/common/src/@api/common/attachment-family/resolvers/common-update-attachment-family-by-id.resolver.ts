import { CommonUpdateAttachmentFamilyByIdHandler } from '@api/common/attachment-family';
import { CommonAttachmentFamily, CommonUpdateAttachmentFamilyByIdInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachmentFamily.update')
export class CommonUpdateAttachmentFamilyByIdResolver
{
    constructor(
        private readonly handler: CommonUpdateAttachmentFamilyByIdHandler,
    ) {}

    @Mutation('commonUpdateAttachmentFamilyById')
    async main(
        @Args('payload') payload: CommonUpdateAttachmentFamilyByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAttachmentFamily>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}
