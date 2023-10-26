import { CommonUpdateAttachmentLibrariesHandler } from '@api/common/attachment-library';
import { CommonAttachmentLibrary, CommonUpdateAttachmentLibrariesInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachmentLibrary.update')
export class CommonUpdateAttachmentLibrariesResolver
{
    constructor(
        private readonly handler: CommonUpdateAttachmentLibrariesHandler,
    ) {}

    @Mutation('commonUpdateAttachmentLibraries')
    async main(
        @Args('payload') payload: CommonUpdateAttachmentLibrariesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAttachmentLibrary>
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
