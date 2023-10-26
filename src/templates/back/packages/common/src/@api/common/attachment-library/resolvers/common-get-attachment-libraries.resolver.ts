import { CommonGetAttachmentLibrariesHandler } from '@api/common/attachment-library';
import { CommonAttachmentLibrary } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachmentLibrary.get')
export class CommonGetAttachmentLibrariesResolver
{
    constructor(
        private readonly handler: CommonGetAttachmentLibrariesHandler,
    ) {}

    @Query('commonGetAttachmentLibraries')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAttachmentLibrary[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
