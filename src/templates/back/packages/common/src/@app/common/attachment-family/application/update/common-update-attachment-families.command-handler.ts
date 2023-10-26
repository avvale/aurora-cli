/* eslint-disable key-spacing */
import { CommonUpdateAttachmentFamiliesCommand } from '@app/common/attachment-family';
import { CommonUpdateAttachmentFamiliesService } from '@app/common/attachment-family/application/update/common-update-attachment-families.service';
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
                code: new CommonAttachmentFamilyCode(command.payload.code, { undefinable: true }),
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
