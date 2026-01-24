/* eslint-disable key-spacing */
import { CommonCreateAttachmentsCommand } from '@app/common/attachment';
import { CommonCreateAttachmentsService } from '@app/common/attachment/application/create/common-create-attachments.service';
import {
  CommonAttachmentAlt,
  CommonAttachmentAttachableId,
  CommonAttachmentExtension,
  CommonAttachmentFamilyId,
  CommonAttachmentFilename,
  CommonAttachmentHeight,
  CommonAttachmentId,
  CommonAttachmentIsCropable,
  CommonAttachmentLangId,
  CommonAttachmentLibraryFilename,
  CommonAttachmentLibraryId,
  CommonAttachmentMeta,
  CommonAttachmentMimetype,
  CommonAttachmentOriginFilename,
  CommonAttachmentRelativePathSegments,
  CommonAttachmentSize,
  CommonAttachmentSizes,
  CommonAttachmentSort,
  CommonAttachmentTitle,
  CommonAttachmentUrl,
  CommonAttachmentWidth,
} from '@app/common/attachment/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonCreateAttachmentsCommand)
export class CommonCreateAttachmentsCommandHandler
  implements ICommandHandler<CommonCreateAttachmentsCommand>
{
  constructor(
    private readonly createAttachmentsService: CommonCreateAttachmentsService,
  ) {}

  async execute(command: CommonCreateAttachmentsCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createAttachmentsService.main(
      command.payload.map((attachment) => {
        return {
          id: new CommonAttachmentId(attachment.id),
          familyId: new CommonAttachmentFamilyId(attachment.familyId),
          attachableId: new CommonAttachmentAttachableId(
            attachment.attachableId,
          ),
          langId: new CommonAttachmentLangId(attachment.langId),
          sort: new CommonAttachmentSort(attachment.sort),
          alt: new CommonAttachmentAlt(attachment.alt),
          title: new CommonAttachmentTitle(attachment.title),
          originFilename: new CommonAttachmentOriginFilename(
            attachment.originFilename,
          ),
          filename: new CommonAttachmentFilename(attachment.filename),
          mimetype: new CommonAttachmentMimetype(attachment.mimetype),
          extension: new CommonAttachmentExtension(attachment.extension),
          relativePathSegments: new CommonAttachmentRelativePathSegments(
            attachment.relativePathSegments,
          ),
          width: new CommonAttachmentWidth(attachment.width),
          height: new CommonAttachmentHeight(attachment.height),
          size: new CommonAttachmentSize(attachment.size),
          url: new CommonAttachmentUrl(attachment.url),
          isCropable: new CommonAttachmentIsCropable(attachment.isCropable),
          libraryId: new CommonAttachmentLibraryId(attachment.libraryId),
          libraryFilename: new CommonAttachmentLibraryFilename(
            attachment.libraryFilename,
          ),
          sizes: new CommonAttachmentSizes(attachment.sizes),
          meta: new CommonAttachmentMeta(attachment.meta),
        };
      }),
      command.cQMetadata,
    );
  }
}
