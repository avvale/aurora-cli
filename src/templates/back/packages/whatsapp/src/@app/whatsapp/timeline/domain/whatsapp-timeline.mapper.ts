import {
    WhatsappTimeline,
    WhatsappTimelineResponse,
} from '@app/whatsapp/timeline';
import {
    WhatsappTimelineAccounts,
    WhatsappTimelineCreatedAt,
    WhatsappTimelineDeletedAt,
    WhatsappTimelineId,
    WhatsappTimelineUpdatedAt,
    WhatsappTimelineWabaContactId,
    WhatsappTimelineWabaPhoneNumberId,
} from '@app/whatsapp/timeline/domain/value-objects';
import {
    CQMetadata,
    IMapper,
    LiteralObject,
    MapperOptions,
} from '@aurorajs.dev/core';

export class WhatsappTimelineMapper implements IMapper {
    constructor(public options: MapperOptions = { eagerLoading: true }) {}

    /**
     * Map object to aggregate
     * @param timeline
     */
    mapModelToAggregate(
        timeline: LiteralObject,
        cQMetadata?: CQMetadata,
    ): WhatsappTimeline {
        if (!timeline) return;

        return this.makeAggregate(timeline, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param timelines
     */
    mapModelsToAggregates(
        timelines: LiteralObject[],
        cQMetadata?: CQMetadata,
    ): WhatsappTimeline[] {
        if (!Array.isArray(timelines)) return;

        return timelines.map((timeline) =>
            this.makeAggregate(timeline, cQMetadata),
        );
    }

    /**
     * Map aggregate to response
     * @param timeline
     */
    mapAggregateToResponse(
        timeline: WhatsappTimeline,
    ): WhatsappTimelineResponse {
        return this.makeResponse(timeline);
    }

    /**
     * Map array of aggregates to array responses
     * @param timelines
     */
    mapAggregatesToResponses(
        timelines: WhatsappTimeline[],
    ): WhatsappTimelineResponse[] {
        if (!Array.isArray(timelines)) return;

        return timelines.map((timeline) => this.makeResponse(timeline));
    }

    private makeAggregate(
        timeline: LiteralObject,
        cQMetadata?: CQMetadata,
    ): WhatsappTimeline {
        return WhatsappTimeline.register(
            new WhatsappTimelineId(timeline.id, { undefinable: true }),
            new WhatsappTimelineAccounts(timeline.accounts, {
                undefinable: true,
            }),
            new WhatsappTimelineWabaPhoneNumberId(timeline.wabaPhoneNumberId, {
                undefinable: true,
            }),
            new WhatsappTimelineWabaContactId(timeline.wabaContactId, {
                undefinable: true,
            }),
            new WhatsappTimelineCreatedAt(
                timeline.createdAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new WhatsappTimelineUpdatedAt(
                timeline.updatedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new WhatsappTimelineDeletedAt(
                timeline.deletedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
        );
    }

    private makeResponse(timeline: WhatsappTimeline): WhatsappTimelineResponse {
        if (!timeline) return null;

        return new WhatsappTimelineResponse(
            timeline.id.value,
            timeline.accounts.value,
            timeline.wabaPhoneNumberId.value,
            timeline.wabaContactId.value,
            timeline.createdAt.value,
            timeline.updatedAt.value,
            timeline.deletedAt.value,
        );
    }
}
