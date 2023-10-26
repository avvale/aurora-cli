import { CommonPaginateAttachmentLibrariesHandler } from '@api/common/attachment-library';
import { Pagination } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachmentLibrary.get')
export class CommonPaginateAttachmentLibrariesResolver
{
    constructor(
        private readonly handler: CommonPaginateAttachmentLibrariesHandler,
    ) {}

    @Query('commonPaginateAttachmentLibraries')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
