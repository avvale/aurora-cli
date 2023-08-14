/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonUpdateAttachmentFamiliesCommand } from './common-update-attachment-families.command';
import { CommonUpdateAttachmentFamiliesService } from './common-update-attachment-families.service';
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

@CommandHandler(CommonUpdateAttachmentFamiliesCommand)
export class CommonUpdateAttachmentFamiliesCommandHandler implements ICommandHandler<CommonUpdateAttachmentFamiliesCommand>
{
    constructor(
        private readonly updateAttachmentFamiliesService: CommonUpdateAttachmentFamiliesService,
    ) {}

    async execute(command: CommonUpdateAttachmentFamiliesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAttachmentFamiliesService.main(
            {
                id: new CommonAttachmentFamilyId(command.payload.id, { undefinable: true }),
                resourceId: new CommonAttachmentFamilyResourceId(command.payload.resourceId, { undefinable: true }),
                name: new CommonAttachmentFamilyName(command.payload.name, { undefinable: true }),
                width: new CommonAttachmentFamilyWidth(command.payload.width),
                height: new CommonAttachmentFamilyHeight(command.payload.height),
                fitType: new CommonAttachmentFamilyFitType(command.payload.fitType),
                quality: new CommonAttachmentFamilyQuality(command.payload.quality),
                sizes: new CommonAttachmentFamilySizes(command.payload.sizes),
                format: new CommonAttachmentFamilyFormat(command.payload.format),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
