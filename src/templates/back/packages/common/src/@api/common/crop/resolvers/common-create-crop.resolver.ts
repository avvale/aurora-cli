import { CommonCreateCropHandler } from '../handlers/common-create-crop.handler';
import { CommonCreateAttachmentInput, CommonCreatedCrop, CommonCropPropertiesInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachment.create')
export class CommonCreateCropResolver
{
    constructor(
        private readonly handler: CommonCreateCropHandler,
    ) {}

    @Mutation('commonCreateCrop')
    async main(
        @Args('crop') crop: CommonCropPropertiesInput,
        @Args('attachment') attachment: CommonCreateAttachmentInput,
    ): Promise<CommonCreatedCrop>
    {
        return await this.handler.main(
            crop,
            attachment,
        );
    }
}
