/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonUpdateAttachmentFamilyByIdCommand } from './common-update-attachment-family-by-id.command';
import { CommonUpdateAttachmentFamilyByIdService } from './common-update-attachment-family-by-id.service';
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

@CommandHandler(CommonUpdateAttachmentFamilyByIdCommand)
export class CommonUpdateAttachmentFamilyByIdCommandHandler implements ICommandHandler<CommonUpdateAttachmentFamilyByIdCommand>
{
    constructor(
        private readonly updateAttachmentFamilyByIdService: CommonUpdateAttachmentFamilyByIdService,
    ) {}

    async execute(command: CommonUpdateAttachmentFamilyByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAttachmentFamilyByIdService.main(
            {
                id: new CommonAttachmentFamilyId(command.payload.id),
                resourceId: new CommonAttachmentFamilyResourceId(command.payload.resourceId, { undefinable: true }),
                name: new CommonAttachmentFamilyName(command.payload.name, { undefinable: true }),
                width: new CommonAttachmentFamilyWidth(command.payload.width),
                height: new CommonAttachmentFamilyHeight(command.payload.height),
                fitType: new CommonAttachmentFamilyFitType(command.payload.fitType),
                quality: new CommonAttachmentFamilyQuality(command.payload.quality),
                sizes: new CommonAttachmentFamilySizes(command.payload.sizes),
                format: new CommonAttachmentFamilyFormat(command.payload.format),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
