import { CommonAttachment, CommonAttachmentResponse } from '@app/common/attachment';
import { CommonAttachmentFamilyMapper } from '@app/common/attachment-family';
import { CommonAttachmentLibraryMapper } from '@app/common/attachment-library';
import {
    CommonAttachmentAlt,
    CommonAttachmentAttachableId,
    CommonAttachmentCreatedAt,
    CommonAttachmentDeletedAt,
    CommonAttachmentExtension,
    CommonAttachmentFamilyId,
    CommonAttachmentFilename,
    CommonAttachmentHeight,
    CommonAttachmentId,
    CommonAttachmentIsCropable,
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
    CommonAttachmentUpdatedAt,
    CommonAttachmentUrl,
    CommonAttachmentWidth,
} from '@app/common/attachment/domain/value-objects';
import { CQMetadata, IMapper, LiteralObject, MapperOptions } from '@aurorajs.dev/core';

export class CommonAttachmentMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param attachment
     */
    mapModelToAggregate(attachment: LiteralObject, cQMetadata?: CQMetadata): CommonAttachment
    {
        if (!attachment) return;

        return this.makeAggregate(attachment, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param attachments
     */
    mapModelsToAggregates(attachments: LiteralObject[], cQMetadata?: CQMetadata): CommonAttachment[]
    {
        if (!Array.isArray(attachments)) return;

        return attachments.map(attachment => this.makeAggregate(attachment, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param attachment
     */
    mapAggregateToResponse(attachment: CommonAttachment): CommonAttachmentResponse
    {
        return this.makeResponse(attachment);
    }

    /**
     * Map array of aggregates to array responses
     * @param attachments
     */
    mapAggregatesToResponses(attachments: CommonAttachment[]): CommonAttachmentResponse[]
    {
        if (!Array.isArray(attachments)) return;

        return attachments.map(attachment => this.makeResponse(attachment));
    }

    private makeAggregate(attachment: LiteralObject, cQMetadata?: CQMetadata): CommonAttachment
    {
        return CommonAttachment.register(
            new CommonAttachmentId(attachment.id, { undefinable: true }),
            new CommonAttachmentFamilyId(attachment.familyId, { undefinable: true }),
            new CommonAttachmentAttachableId(attachment.attachableId, { undefinable: true }),
            new CommonAttachmentSort(attachment.sort, { undefinable: true }),
            new CommonAttachmentAlt(attachment.alt, { undefinable: true }),
            new CommonAttachmentTitle(attachment.title, { undefinable: true }),
            new CommonAttachmentOriginFilename(attachment.originFilename, { undefinable: true }),
            new CommonAttachmentFilename(attachment.filename, { undefinable: true }),
            new CommonAttachmentMimetype(attachment.mimetype, { undefinable: true }),
            new CommonAttachmentExtension(attachment.extension, { undefinable: true }),
            new CommonAttachmentRelativePathSegments(attachment.relativePathSegments, { undefinable: true }),
            new CommonAttachmentWidth(attachment.width, { undefinable: true }),
            new CommonAttachmentHeight(attachment.height, { undefinable: true }),
            new CommonAttachmentSize(attachment.size, { undefinable: true }),
            new CommonAttachmentUrl(attachment.url, { undefinable: true }),
            new CommonAttachmentIsCropable(attachment.isCropable, { undefinable: true }),
            new CommonAttachmentLibraryId(attachment.libraryId, { undefinable: true }),
            new CommonAttachmentLibraryFilename(attachment.libraryFilename, { undefinable: true }),
            new CommonAttachmentSizes(attachment.sizes, { undefinable: true }),
            new CommonAttachmentMeta(attachment.meta, { undefinable: true }),
            new CommonAttachmentCreatedAt(attachment.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new CommonAttachmentUpdatedAt(attachment.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new CommonAttachmentDeletedAt(attachment.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new CommonAttachmentFamilyMapper({ eagerLoading: true }).mapModelToAggregate(attachment.family, cQMetadata) : undefined,
            this.options.eagerLoading ? new CommonAttachmentLibraryMapper({ eagerLoading: true }).mapModelToAggregate(attachment.library, cQMetadata) : undefined,
        );
    }

    private makeResponse(attachment: CommonAttachment): CommonAttachmentResponse
    {
        if (!attachment) return;

        return new CommonAttachmentResponse(
            attachment.id.value,
            attachment.familyId.value,
            attachment.attachableId.value,
            attachment.sort.value,
            attachment.alt.value,
            attachment.title.value,
            attachment.originFilename.value,
            attachment.filename.value,
            attachment.mimetype.value,
            attachment.extension.value,
            attachment.relativePathSegments.value,
            attachment.width.value,
            attachment.height.value,
            attachment.size.value,
            attachment.url.value,
            attachment.isCropable.value,
            attachment.libraryId.value,
            attachment.libraryFilename.value,
            attachment.sizes.value,
            attachment.meta.value,
            attachment.createdAt.value,
            attachment.updatedAt.value,
            attachment.deletedAt.value,
            this.options.eagerLoading ? new CommonAttachmentFamilyMapper({ eagerLoading: true }).mapAggregateToResponse(attachment.family) : undefined,
            this.options.eagerLoading ? new CommonAttachmentLibraryMapper({ eagerLoading: true }).mapAggregateToResponse(attachment.library) : undefined,
        );
    }
}
