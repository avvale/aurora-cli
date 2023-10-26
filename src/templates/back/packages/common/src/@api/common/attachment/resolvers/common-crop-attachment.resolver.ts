import { CommonCropAttachmentHandler } from '@api/common/attachment';
import { CommonCropAttachmentInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachment.update')
export class CommonCropAttachmentResolver
{
    constructor(
        private readonly handler: CommonCropAttachmentHandler,
    ) {}

    @Mutation('commonCropAttachment')
    async main(
        @Args('payload') payload: CommonCropAttachmentInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}
