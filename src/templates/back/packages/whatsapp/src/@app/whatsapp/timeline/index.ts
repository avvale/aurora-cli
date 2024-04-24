// export commands
export { WhatsappCreateTimelineCommand } from './application/create/whatsapp-create-timeline.command';
export { WhatsappCreateTimelinesCommand } from './application/create/whatsapp-create-timelines.command';
export { WhatsappUpdateTimelineByIdCommand } from './application/update/whatsapp-update-timeline-by-id.command';
export { WhatsappUpdateTimelinesCommand } from './application/update/whatsapp-update-timelines.command';
export { WhatsappUpdateAndIncrementTimelinesCommand } from './application/update/whatsapp-update-and-increment-timelines.command';
export { WhatsappUpsertTimelineCommand } from './application/upsert/whatsapp-upsert-timeline.command';
export { WhatsappDeleteTimelineByIdCommand } from './application/delete/whatsapp-delete-timeline-by-id.command';
export { WhatsappDeleteTimelinesCommand } from './application/delete/whatsapp-delete-timelines.command';

// export queries
export { WhatsappPaginateTimelinesQuery } from './application/paginate/whatsapp-paginate-timelines.query';
export { WhatsappGetTimelinesQuery } from './application/get/whatsapp-get-timelines.query';
export { WhatsappFindTimelineQuery } from './application/find/whatsapp-find-timeline.query';
export { WhatsappFindTimelineByIdQuery } from './application/find/whatsapp-find-timeline-by-id.query';
export { WhatsappRawSQLTimelinesQuery } from './application/raw-sql/whatsapp-raw-sql-timelines.query';
export { WhatsappCountTimelineQuery } from './application/count/whatsapp-count-timeline.query';
export { WhatsappMaxTimelineQuery } from './application/max/whatsapp-max-timeline.query';
export { WhatsappMinTimelineQuery } from './application/min/whatsapp-min-timeline.query';
export { WhatsappSumTimelineQuery } from './application/sum/whatsapp-sum-timeline.query';

// export mocks
export { whatsappMockTimelineData } from './infrastructure/mock/whatsapp-mock-timeline.data';
export { WhatsappMockTimelineSeeder } from './infrastructure/mock/whatsapp-mock-timeline.seeder';
export { WhatsappMockTimelineRepository } from './infrastructure/mock/whatsapp-mock-timeline.repository';

// export events
export { WhatsappAddTimelinesContextEvent } from './application/events/whatsapp-add-timelines-context.event';
export { WhatsappCreatedTimelinesEvent } from './application/events/whatsapp-created-timelines.event';
export { WhatsappCreatedTimelineEvent } from './application/events/whatsapp-created-timeline.event';
export { WhatsappDeletedTimelinesEvent } from './application/events/whatsapp-deleted-timelines.event';
export { WhatsappDeletedTimelineEvent } from './application/events/whatsapp-deleted-timeline.event';
export { WhatsappUpdatedTimelinesEvent } from './application/events/whatsapp-updated-timelines.event';
export { WhatsappUpdatedTimelineEvent } from './application/events/whatsapp-updated-timeline.event';
export { WhatsappUpdatedAndIncrementedTimelinesEvent } from './application/events/whatsapp-updated-and-incremented-timelines.event';
export { WhatsappUpdatedAndIncrementedTimelineEvent } from './application/events/whatsapp-updated-and-incremented-timeline.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { WhatsappTimeline } from './domain/whatsapp-timeline.aggregate';
export { WhatsappTimelineMapper } from './domain/whatsapp-timeline.mapper';
export { WhatsappITimelineRepository } from './domain/whatsapp-timeline.repository';
export { WhatsappTimelineResponse } from './domain/whatsapp-timeline.response';

// infrastructure
export { WhatsappTimelineModel } from './infrastructure/sequelize/whatsapp-sequelize-timeline.model';
export { WhatsappSequelizeTimelineRepository } from './infrastructure/sequelize/whatsapp-sequelize-timeline.repository';

// sagas
export { WhatsappTimelineSagas } from './application/sagas/whatsapp-timeline.sagas';

// command handlers
import { WhatsappCreateTimelineCommandHandler } from './application/create/whatsapp-create-timeline.command-handler';
import { WhatsappCreateTimelinesCommandHandler } from './application/create/whatsapp-create-timelines.command-handler';
import { WhatsappUpdateTimelineByIdCommandHandler } from './application/update/whatsapp-update-timeline-by-id.command-handler';
import { WhatsappUpdateTimelinesCommandHandler } from './application/update/whatsapp-update-timelines.command-handler';
import { WhatsappUpdateAndIncrementTimelinesCommandHandler } from './application/update/whatsapp-update-and-increment-timelines.command-handler';
import { WhatsappUpsertTimelineCommandHandler } from './application/upsert/whatsapp-upsert-timeline.command-handler';
import { WhatsappDeleteTimelineByIdCommandHandler } from './application/delete/whatsapp-delete-timeline-by-id.command-handler';
import { WhatsappDeleteTimelinesCommandHandler } from './application/delete/whatsapp-delete-timelines.command-handler';

// query handlers
import { WhatsappPaginateTimelinesQueryHandler } from './application/paginate/whatsapp-paginate-timelines.query-handler';
import { WhatsappGetTimelinesQueryHandler } from './application/get/whatsapp-get-timelines.query-handler';
import { WhatsappFindTimelineQueryHandler } from './application/find/whatsapp-find-timeline.query-handler';
import { WhatsappFindTimelineByIdQueryHandler } from './application/find/whatsapp-find-timeline-by-id.query-handler';
import { WhatsappRawSQLTimelinesQueryHandler } from './application/raw-sql/whatsapp-raw-sql-timelines.query-handler';
import { WhatsappCountTimelineQueryHandler } from './application/count/whatsapp-count-timeline.query-handler';
import { WhatsappMaxTimelineQueryHandler } from './application/max/whatsapp-max-timeline.query-handler';
import { WhatsappMinTimelineQueryHandler } from './application/min/whatsapp-min-timeline.query-handler';
import { WhatsappSumTimelineQueryHandler } from './application/sum/whatsapp-sum-timeline.query-handler';

// event handlers
import { WhatsappCreatedTimelineEventHandler } from './application/events/whatsapp-created-timeline.event-handler';
import { WhatsappCreatedTimelinesEventHandler } from './application/events/whatsapp-created-timelines.event-handler';
import { WhatsappUpdatedTimelineEventHandler } from './application/events/whatsapp-updated-timeline.event-handler';
import { WhatsappUpdatedTimelinesEventHandler } from './application/events/whatsapp-updated-timelines.event-handler';
import { WhatsappUpdatedAndIncrementedTimelinesEventHandler } from './application/events/whatsapp-updated-and-incremented-timelines.event-handler';
import { WhatsappDeletedTimelineEventHandler } from './application/events/whatsapp-deleted-timeline.event-handler';
import { WhatsappDeletedTimelinesEventHandler } from './application/events/whatsapp-deleted-timelines.event-handler';

// services
import { WhatsappCreateTimelineService } from './application/create/whatsapp-create-timeline.service';
import { WhatsappCreateTimelinesService } from './application/create/whatsapp-create-timelines.service';
import { WhatsappPaginateTimelinesService } from './application/paginate/whatsapp-paginate-timelines.service';
import { WhatsappGetTimelinesService } from './application/get/whatsapp-get-timelines.service';
import { WhatsappFindTimelineService } from './application/find/whatsapp-find-timeline.service';
import { WhatsappFindTimelineByIdService } from './application/find/whatsapp-find-timeline-by-id.service';
import { WhatsappRawSQLTimelinesService } from './application/raw-sql/whatsapp-raw-sql-timelines.service';
import { WhatsappCountTimelineService } from './application/count/whatsapp-count-timeline.service';
import { WhatsappMaxTimelineService } from './application/max/whatsapp-max-timeline.service';
import { WhatsappMinTimelineService } from './application/min/whatsapp-min-timeline.service';
import { WhatsappSumTimelineService } from './application/sum/whatsapp-sum-timeline.service';
import { WhatsappUpdateTimelineByIdService } from './application/update/whatsapp-update-timeline-by-id.service';
import { WhatsappUpdateTimelinesService } from './application/update/whatsapp-update-timelines.service';
import { WhatsappUpdateAndIncrementTimelinesService } from './application/update/whatsapp-update-and-increment-timelines.service';
import { WhatsappUpsertTimelineService } from './application/upsert/whatsapp-upsert-timeline.service';
import { WhatsappDeleteTimelineByIdService } from './application/delete/whatsapp-delete-timeline-by-id.service';
import { WhatsappDeleteTimelinesService } from './application/delete/whatsapp-delete-timelines.service';

export const WhatsappTimelineHandlers = [
    // commands
    WhatsappCreateTimelineCommandHandler,
    WhatsappCreateTimelinesCommandHandler,
    WhatsappUpdateTimelineByIdCommandHandler,
    WhatsappUpdateTimelinesCommandHandler,
    WhatsappUpdateAndIncrementTimelinesCommandHandler,
    WhatsappUpsertTimelineCommandHandler,
    WhatsappDeleteTimelineByIdCommandHandler,
    WhatsappDeleteTimelinesCommandHandler,

    // queries
    WhatsappPaginateTimelinesQueryHandler,
    WhatsappGetTimelinesQueryHandler,
    WhatsappFindTimelineQueryHandler,
    WhatsappFindTimelineByIdQueryHandler,
    WhatsappRawSQLTimelinesQueryHandler,
    WhatsappCountTimelineQueryHandler,
    WhatsappMaxTimelineQueryHandler,
    WhatsappMinTimelineQueryHandler,
    WhatsappSumTimelineQueryHandler,

    // events
    WhatsappCreatedTimelineEventHandler,
    WhatsappCreatedTimelinesEventHandler,
    WhatsappUpdatedTimelineEventHandler,
    WhatsappUpdatedTimelinesEventHandler,
    WhatsappUpdatedAndIncrementedTimelinesEventHandler,
    WhatsappDeletedTimelineEventHandler,
    WhatsappDeletedTimelinesEventHandler,
];

export const WhatsappTimelineServices = [
    WhatsappCreateTimelineService,
    WhatsappCreateTimelinesService,
    WhatsappPaginateTimelinesService,
    WhatsappGetTimelinesService,
    WhatsappFindTimelineService,
    WhatsappFindTimelineByIdService,
    WhatsappRawSQLTimelinesService,
    WhatsappCountTimelineService,
    WhatsappMaxTimelineService,
    WhatsappMinTimelineService,
    WhatsappSumTimelineService,
    WhatsappUpdateTimelineByIdService,
    WhatsappUpdateTimelinesService,
    WhatsappUpdateAndIncrementTimelinesService,
    WhatsappUpsertTimelineService,
    WhatsappDeleteTimelineByIdService,
    WhatsappDeleteTimelinesService,
];