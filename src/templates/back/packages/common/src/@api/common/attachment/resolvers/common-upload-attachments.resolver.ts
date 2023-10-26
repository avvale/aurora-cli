import { CommonUploadAttachmentsHandler } from '@api/common/attachment';
import { CoreFile, CoreFileUploaded } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachment.upload')
export class CommonUploadAttachmentsResolver
{
    constructor(
        private readonly handler: CommonUploadAttachmentsHandler,
    ) {}

    @Mutation('commonUploadAttachments')
    async main(
        @Args('files') files: CoreFileUploaded[],
    ): Promise<CoreFile[]>
    {
        return await this.handler.main(
            files,
        );
    }
}
