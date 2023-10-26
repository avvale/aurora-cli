/* eslint-disable key-spacing */
import { CommonCreateAttachmentFamiliesCommand } from '@app/common/attachment-family';
import { CommonCreateAttachmentFamiliesService } from '@app/common/attachment-family/application/create/common-create-attachment-families.service';
import {
    CommonAttachmentFamilyCode,
    CommonAttachmentFamilyFitType,
    CommonAttachmentFamilyFormat,
    CommonAttachmentFamilyHeight,
    CommonAttachmentFamilyId,
    CommonAttachmentFamilyName,
    CommonAttachmentFamilyQuality,
    CommonAttachmentFamilyResourceId,
    CommonAttachmentFamilySizes,
    CommonAttachmentFamilyWidth,
} from '@app/common/attachment-family/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonCreateAttachmentFamiliesCommand)
export class CommonCreateAttachmentFamiliesCommandHandler implements ICommandHandler<CommonCreateAttachmentFamiliesCommand>
{
    constructor(
        private readonly createAttachmentFamiliesService: CommonCreateAttachmentFamiliesService,
    ) {}

    async execute(command: CommonCreateAttachmentFamiliesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAttachmentFamiliesService.main(
            command.payload
                .map(attachmentFamily =>
                {
                    return {
                        id: new CommonAttachmentFamilyId(attachmentFamily.id),
                        resourceId: new CommonAttachmentFamilyResourceId(attachmentFamily.resourceId),
                        code: new CommonAttachmentFamilyCode(attachmentFamily.code),
                        name: new CommonAttachmentFamilyName(attachmentFamily.name),
                        width: new CommonAttachmentFamilyWidth(attachmentFamily.width),
                        height: new CommonAttachmentFamilyHeight(attachmentFamily.height),
                        fitType: new CommonAttachmentFamilyFitType(attachmentFamily.fitType),
                        quality: new CommonAttachmentFamilyQuality(attachmentFamily.quality),
                        sizes: new CommonAttachmentFamilySizes(attachmentFamily.sizes),
                        format: new CommonAttachmentFamilyFormat(attachmentFamily.format),
                    };
                }),
            command.cQMetadata,
        );
    }
}
