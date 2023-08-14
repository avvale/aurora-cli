import { CommonPaginateAttachmentFamiliesHandler } from '@api/common/attachment-family';
import { Pagination } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachmentFamily.get')
export class CommonPaginateAttachmentFamiliesResolver
{
    constructor(
        private readonly handler: CommonPaginateAttachmentFamiliesHandler,
    ) {}

    @Query('commonPaginateAttachmentFamilies')
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
