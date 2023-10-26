import { CommonUpsertAttachmentLibraryHandler } from '@api/common/attachment-library';
import { CommonAttachmentLibrary, CommonUpdateAttachmentLibraryByIdInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachmentLibrary.upsert')
export class CommonUpsertAttachmentLibraryResolver
{
    constructor(
        private readonly handler: CommonUpsertAttachmentLibraryHandler,
    ) {}

    @Mutation('commonUpsertAttachmentLibrary')
    async main(
        @Args('payload') payload: CommonUpdateAttachmentLibraryByIdInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAttachmentLibrary>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
