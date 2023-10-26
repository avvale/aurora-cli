import { CommonCreateAttachmentLibraryHandler } from '@api/common/attachment-library';
import { CommonAttachmentLibrary, CommonCreateAttachmentLibraryInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachmentLibrary.create')
export class CommonCreateAttachmentLibraryResolver
{
    constructor(
        private readonly handler: CommonCreateAttachmentLibraryHandler,
    ) {}

    @Mutation('commonCreateAttachmentLibrary')
    async main(
        @Args('payload') payload: CommonCreateAttachmentLibraryInput,
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
