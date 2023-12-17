import { CommonCreateBlobAttachmentHandler } from '@api/common/attachment';
import { CommonAttachmentInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachment.get')
export class CommonCreateBlobAttachmentResolver
{
    constructor(
        private readonly handler: CommonCreateBlobAttachmentHandler,
    ) {}

    @Mutation('commonCreateBlobAttachment')
    async main(
        @Args('payload') payload: CommonAttachmentInput,
    ): Promise<string>
    {
        return await this.handler.main(
            payload,
        );
    }
}
