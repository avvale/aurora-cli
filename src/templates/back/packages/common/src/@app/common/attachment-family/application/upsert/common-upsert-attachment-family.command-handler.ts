/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonUpsertAttachmentFamilyCommand } from './common-upsert-attachment-family.command';
import { CommonUpsertAttachmentFamilyService } from './common-upsert-attachment-family.service';
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
