import { IamTag, IamTagResponse } from '@app/iam/tag';
import {
    IamTagCreatedAt,
    IamTagDeletedAt,
    IamTagId,
    IamTagName,
    IamTagRowId,
    IamTagUpdatedAt,
} from '@app/iam/tag/domain/value-objects';
import {
    CQMetadata,
    IMapper,
    LiteralObject,
    MapperOptions,
} from '@aurorajs.dev/core';

export class IamTagMapper implements IMapper {
    constructor(public options: MapperOptions = { eagerLoading: true }) {}

    /**
     * Map object to aggregate
     * @param tag
     */
    mapModelToAggregate(tag: LiteralObject, cQMetadata?: CQMetadata): IamTag {
        if (!tag) return;

        return this.makeAggregate(tag, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param tags
     */
    mapModelsToAggregates(
        tags: LiteralObject[],
        cQMetadata?: CQMetadata,
    ): IamTag[] {
        if (!Array.isArray(tags)) return;

        return tags.map((tag) => this.makeAggregate(tag, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param tag
     */
    mapAggregateToResponse(tag: IamTag): IamTagResponse {
        return this.makeResponse(tag);
    }

    /**
     * Map array of aggregates to array responses
     * @param tags
     */
    mapAggregatesToResponses(tags: IamTag[]): IamTagResponse[] {
        if (!Array.isArray(tags)) return;

        return tags.map((tag) => this.makeResponse(tag));
    }

    private makeAggregate(tag: LiteralObject, cQMetadata?: CQMetadata): IamTag {
        return IamTag.register(
            new IamTagId(tag.id, { undefinable: true }),
            new IamTagRowId(tag.rowId, { undefinable: true }),
            new IamTagName(tag.name, { undefinable: true }),
            new IamTagCreatedAt(
                tag.createdAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new IamTagUpdatedAt(
                tag.updatedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new IamTagDeletedAt(
                tag.deletedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
        );
    }

    private makeResponse(tag: IamTag): IamTagResponse {
        if (!tag) return;

        return new IamTagResponse(
            tag.id.value,
            tag.rowId.value,
            tag.name.value,
            tag.createdAt.value,
            tag.updatedAt.value,
            tag.deletedAt.value,
        );
    }
}
