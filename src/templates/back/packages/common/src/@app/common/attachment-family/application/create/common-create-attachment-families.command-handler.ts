/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonCreateAttachmentFamiliesCommand } from './common-create-attachment-families.command';
import { CommonCreateAttachmentFamiliesService } from './common-create-attachment-families.service';
import {
    CommonAttachmentFamilyId,
    CommonAttachmentFamilyResourceId,
    CommonAttachmentFamilyName,
    CommonAttachmentFamilyWidth,
    CommonAttachmentFamilyHeight,
    CommonAttachmentFamilyFitType,
    CommonAttachmentFamilyQuality,
    CommonAttachmentFamilySizes,
    CommonAttachmentFamilyFormat,
    CommonAttachmentFamilyCreatedAt,
    CommonAttachmentFamilyUpdatedAt,
    CommonAttachmentFamilyDeletedAt,
} from '../../domain/value-objects';

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
