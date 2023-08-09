import { CommonFindAttachmentFamilyHandler } from '@api/common/attachment-family';
import { CommonAttachmentFamily } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachmentFamily.get')
export class CommonFindAttachmentFamilyResolver
{
    constructor(
        private readonly handler: CommonFindAttachmentFamilyHandler,
    ) {}

    @Query('commonFindAttachmentFamily')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAttachmentFamily>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
