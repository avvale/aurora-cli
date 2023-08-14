import { CommonDeleteAttachmentFamiliesHandler } from '@api/common/attachment-family';
import { CommonAttachmentFamily } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachmentFamily.delete')
export class CommonDeleteAttachmentFamiliesResolver
{
    constructor(
        private readonly handler: CommonDeleteAttachmentFamiliesHandler,
    ) {}

    @Mutation('commonDeleteAttachmentFamilies')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAttachmentFamily[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
