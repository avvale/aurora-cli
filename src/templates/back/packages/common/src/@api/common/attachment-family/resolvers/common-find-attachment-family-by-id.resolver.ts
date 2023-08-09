import { CommonFindAttachmentFamilyByIdHandler } from '@api/common/attachment-family';
import { CommonAttachmentFamily } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachmentFamily.get')
export class CommonFindAttachmentFamilyByIdResolver
{
    constructor(
        private readonly handler: CommonFindAttachmentFamilyByIdHandler,
    ) {}

    @Query('commonFindAttachmentFamilyById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAttachmentFamily>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
