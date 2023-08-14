/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonCreateAttachmentFamilyCommand } from './common-create-attachment-family.command';
import { CommonCreateAttachmentFamilyService } from './common-create-attachment-family.service';
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

@CommandHandler(CommonCreateAttachmentFamilyCommand)
export class CommonCreateAttachmentFamilyCommandHandler implements ICommandHandler<CommonCreateAttachmentFamilyCommand>
{
    constructor(
        private readonly createAttachmentFamilyService: CommonCreateAttachmentFamilyService,
    ) {}

    async execute(command: CommonCreateAttachmentFamilyCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAttachmentFamilyService.main(
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
