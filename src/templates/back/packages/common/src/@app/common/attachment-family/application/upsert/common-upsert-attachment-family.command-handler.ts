/* eslint-disable key-spacing */
import { CommonUpsertAttachmentFamilyCommand } from '@app/common/attachment-family';
import { CommonUpsertAttachmentFamilyService } from '@app/common/attachment-family/application/upsert/common-upsert-attachment-family.service';
import {
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

@CommandHandler(CommonUpsertAttachmentFamilyCommand)
export class CommonUpsertAttachmentFamilyCommandHandler implements ICommandHandler<CommonUpsertAttachmentFamilyCommand>
{
    constructor(
        private readonly upsertAttachmentFamilyService: CommonUpsertAttachmentFamilyService,
    ) {}

    async execute(command: CommonUpsertAttachmentFamilyCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertAttachmentFamilyService.main(
            {
                id: new CommonAttachmentFamilyId(command.payload.id),
                resourceId: new CommonAttachmentFamilyResourceId(command.payload.resourceId),
                name: new CommonAttachmentFamilyName(command.payload.name),
                width: new CommonAttachmentFamilyWidth(command.payload.width),
                height: new CommonAttachmentFamilyHeight(command.payload.height),
                fitType: new CommonAttachmentFamilyFitType(command.payload.fitType),
                quality: new CommonAttachmentFamilyQuality(command.payload.quality),
                sizes: new CommonAttachmentFamilySizes(command.payload.sizes),
                format: new CommonAttachmentFamilyFormat(command.payload.format),
            },
            command.cQMetadata,
        );
    }
}
