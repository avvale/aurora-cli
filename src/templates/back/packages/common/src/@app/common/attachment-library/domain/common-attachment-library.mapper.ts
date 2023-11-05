import { CommonAttachmentLibrary, CommonAttachmentLibraryResponse } from '@app/common/attachment-library';
import {
    CommonAttachmentLibraryCreatedAt,
    CommonAttachmentLibraryDeletedAt,
    CommonAttachmentLibraryExtension,
    CommonAttachmentLibraryFilename,
    CommonAttachmentLibraryHeight,
    CommonAttachmentLibraryId,
    CommonAttachmentLibraryMeta,
    CommonAttachmentLibraryMimetype,
    CommonAttachmentLibraryRelativePathSegments,
    CommonAttachmentLibrarySize,
    CommonAttachmentLibraryUpdatedAt,
    CommonAttachmentLibraryUrl,
    CommonAttachmentLibraryWidth,
} from '@app/common/attachment-library/domain/value-objects';
import { CQMetadata, IMapper, LiteralObject, MapperOptions } from '@aurorajs.dev/core';

export class CommonAttachmentLibraryMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param attachmentLibrary
     */
    mapModelToAggregate(attachmentLibrary: LiteralObject, cQMetadata?: CQMetadata): CommonAttachmentLibrary
    {
        if (!attachmentLibrary) return;

        return this.makeAggregate(attachmentLibrary, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param attachmentLibraries
     */
    mapModelsToAggregates(attachmentLibraries: LiteralObject[], cQMetadata?: CQMetadata): CommonAttachmentLibrary[]
    {
        if (!Array.isArray(attachmentLibraries)) return;

        return attachmentLibraries.map(attachmentLibrary => this.makeAggregate(attachmentLibrary, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param attachmentLibrary
     */
    mapAggregateToResponse(attachmentLibrary: CommonAttachmentLibrary): CommonAttachmentLibraryResponse
    {
        return this.makeResponse(attachmentLibrary);
    }

    /**
     * Map array of aggregates to array responses
     * @param attachmentLibraries
     */
    mapAggregatesToResponses(attachmentLibraries: CommonAttachmentLibrary[]): CommonAttachmentLibraryResponse[]
    {
        if (!Array.isArray(attachmentLibraries)) return;

        return attachmentLibraries.map(attachmentLibrary => this.makeResponse(attachmentLibrary));
    }

    private makeAggregate(attachmentLibrary: LiteralObject, cQMetadata?: CQMetadata): CommonAttachmentLibrary
    {
        return CommonAttachmentLibrary.register(
            new CommonAttachmentLibraryId(attachmentLibrary.id, { undefinable: true }),
            new CommonAttachmentLibraryFilename(attachmentLibrary.filename, { undefinable: true }),
            new CommonAttachmentLibraryMimetype(attachmentLibrary.mimetype, { undefinable: true }),
            new CommonAttachmentLibraryExtension(attachmentLibrary.extension, { undefinable: true }),
            new CommonAttachmentLibraryRelativePathSegments(attachmentLibrary.relativePathSegments, { undefinable: true }),
            new CommonAttachmentLibraryWidth(attachmentLibrary.width, { undefinable: true }),
            new CommonAttachmentLibraryHeight(attachmentLibrary.height, { undefinable: true }),
            new CommonAttachmentLibrarySize(attachmentLibrary.size, { undefinable: true }),
            new CommonAttachmentLibraryUrl(attachmentLibrary.url, { undefinable: true }),
            new CommonAttachmentLibraryMeta(attachmentLibrary.meta, { undefinable: true }),
            new CommonAttachmentLibraryCreatedAt(attachmentLibrary.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new CommonAttachmentLibraryUpdatedAt(attachmentLibrary.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new CommonAttachmentLibraryDeletedAt(attachmentLibrary.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(attachmentLibrary: CommonAttachmentLibrary): CommonAttachmentLibraryResponse
    {
        if (!attachmentLibrary) return;

        return new CommonAttachmentLibraryResponse(
            attachmentLibrary.id.value,
            attachmentLibrary.filename.value,
            attachmentLibrary.mimetype.value,
            attachmentLibrary.extension.value,
            attachmentLibrary.relativePathSegments.value,
            attachmentLibrary.width.value,
            attachmentLibrary.height.value,
            attachmentLibrary.size.value,
            attachmentLibrary.url.value,
            attachmentLibrary.meta.value,
            attachmentLibrary.createdAt.value,
            attachmentLibrary.updatedAt.value,
            attachmentLibrary.deletedAt.value,
        );
    }
}
