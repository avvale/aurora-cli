// export DTOs
export { WhatsappTimelineDto } from './dto/whatsapp-timeline.dto';
export { WhatsappUpdateTimelineByIdDto } from './dto/whatsapp-update-timeline-by-id.dto';
export { WhatsappUpdateTimelinesDto } from './dto/whatsapp-update-timelines.dto';

// export handlers
export { WhatsappPaginateTimelinesHandler } from './handlers/whatsapp-paginate-timelines.handler';
export { WhatsappGetTimelinesHandler } from './handlers/whatsapp-get-timelines.handler';
export { WhatsappFindTimelineByIdHandler } from './handlers/whatsapp-find-timeline-by-id.handler';
export { WhatsappFindTimelineHandler } from './handlers/whatsapp-find-timeline.handler';
export { WhatsappUpdateTimelineByIdHandler } from './handlers/whatsapp-update-timeline-by-id.handler';
export { WhatsappUpdateTimelinesHandler } from './handlers/whatsapp-update-timelines.handler';
export { WhatsappDeleteTimelineByIdHandler } from './handlers/whatsapp-delete-timeline-by-id.handler';
export { WhatsappDeleteTimelinesHandler } from './handlers/whatsapp-delete-timelines.handler';

// export controllers
export { WhatsappPaginateTimelinesController } from './controllers/whatsapp-paginate-timelines.controller';
export { WhatsappGetTimelinesController } from './controllers/whatsapp-get-timelines.controller';
export { WhatsappFindTimelineByIdController } from './controllers/whatsapp-find-timeline-by-id.controller';
export { WhatsappFindTimelineController } from './controllers/whatsapp-find-timeline.controller';
export { WhatsappUpdateTimelineByIdController } from './controllers/whatsapp-update-timeline-by-id.controller';
export { WhatsappUpdateTimelinesController } from './controllers/whatsapp-update-timelines.controller';
export { WhatsappDeleteTimelineByIdController } from './controllers/whatsapp-delete-timeline-by-id.controller';
export { WhatsappDeleteTimelinesController } from './controllers/whatsapp-delete-timelines.controller';

// export resolvers
export { WhatsappPaginateTimelinesResolver } from './resolvers/whatsapp-paginate-timelines.resolver';
export { WhatsappGetTimelinesResolver } from './resolvers/whatsapp-get-timelines.resolver';
export { WhatsappFindTimelineByIdResolver } from './resolvers/whatsapp-find-timeline-by-id.resolver';
export { WhatsappFindTimelineResolver } from './resolvers/whatsapp-find-timeline.resolver';
export { WhatsappUpdateTimelineByIdResolver } from './resolvers/whatsapp-update-timeline-by-id.resolver';
export { WhatsappUpdateTimelinesResolver } from './resolvers/whatsapp-update-timelines.resolver';
export { WhatsappDeleteTimelineByIdResolver } from './resolvers/whatsapp-delete-timeline-by-id.resolver';
export { WhatsappDeleteTimelinesResolver } from './resolvers/whatsapp-delete-timelines.resolver';

// import controllers
import { WhatsappPaginateTimelinesController } from './controllers/whatsapp-paginate-timelines.controller';
import { WhatsappGetTimelinesController } from './controllers/whatsapp-get-timelines.controller';
import { WhatsappFindTimelineByIdController } from './controllers/whatsapp-find-timeline-by-id.controller';
import { WhatsappFindTimelineController } from './controllers/whatsapp-find-timeline.controller';
import { WhatsappUpdateTimelineByIdController } from './controllers/whatsapp-update-timeline-by-id.controller';
import { WhatsappUpdateTimelinesController } from './controllers/whatsapp-update-timelines.controller';
import { WhatsappDeleteTimelineByIdController } from './controllers/whatsapp-delete-timeline-by-id.controller';
import { WhatsappDeleteTimelinesController } from './controllers/whatsapp-delete-timelines.controller';

// import resolvers
import { WhatsappPaginateTimelinesResolver } from './resolvers/whatsapp-paginate-timelines.resolver';
import { WhatsappGetTimelinesResolver } from './resolvers/whatsapp-get-timelines.resolver';
import { WhatsappFindTimelineByIdResolver } from './resolvers/whatsapp-find-timeline-by-id.resolver';
import { WhatsappFindTimelineResolver } from './resolvers/whatsapp-find-timeline.resolver';
import { WhatsappUpdateTimelineByIdResolver } from './resolvers/whatsapp-update-timeline-by-id.resolver';
import { WhatsappUpdateTimelinesResolver } from './resolvers/whatsapp-update-timelines.resolver';
import { WhatsappDeleteTimelineByIdResolver } from './resolvers/whatsapp-delete-timeline-by-id.resolver';
import { WhatsappDeleteTimelinesResolver } from './resolvers/whatsapp-delete-timelines.resolver';

// import handlers
import { WhatsappPaginateTimelinesHandler } from './handlers/whatsapp-paginate-timelines.handler';
import { WhatsappGetTimelinesHandler } from './handlers/whatsapp-get-timelines.handler';
import { WhatsappFindTimelineByIdHandler } from './handlers/whatsapp-find-timeline-by-id.handler';
import { WhatsappFindTimelineHandler } from './handlers/whatsapp-find-timeline.handler';
import { WhatsappUpdateTimelineByIdHandler } from './handlers/whatsapp-update-timeline-by-id.handler';
import { WhatsappUpdateTimelinesHandler } from './handlers/whatsapp-update-timelines.handler';
import { WhatsappDeleteTimelineByIdHandler } from './handlers/whatsapp-delete-timeline-by-id.handler';
import { WhatsappDeleteTimelinesHandler } from './handlers/whatsapp-delete-timelines.handler';

// import seeder
import { WhatsappTimelineSeeder } from './seeder/whatsapp-timeline.seeder';

export const WhatsappTimelineApiControllers = [
    WhatsappPaginateTimelinesController,
    WhatsappGetTimelinesController,
    WhatsappFindTimelineByIdController,
    WhatsappFindTimelineController,
    WhatsappUpdateTimelineByIdController,
    WhatsappUpdateTimelinesController,
    WhatsappDeleteTimelineByIdController,
    WhatsappDeleteTimelinesController,
];

export const WhatsappTimelineApiResolvers = [
    WhatsappPaginateTimelinesResolver,
    WhatsappGetTimelinesResolver,
    WhatsappFindTimelineByIdResolver,
    WhatsappFindTimelineResolver,
    WhatsappUpdateTimelineByIdResolver,
    WhatsappUpdateTimelinesResolver,
    WhatsappDeleteTimelineByIdResolver,
    WhatsappDeleteTimelinesResolver,
];

export const WhatsappTimelineApiHandlers = [
    WhatsappPaginateTimelinesHandler,
    WhatsappGetTimelinesHandler,
    WhatsappFindTimelineByIdHandler,
    WhatsappFindTimelineHandler,
    WhatsappUpdateTimelineByIdHandler,
    WhatsappUpdateTimelinesHandler,
    WhatsappDeleteTimelineByIdHandler,
    WhatsappDeleteTimelinesHandler,
];

export const WhatsappTimelineApiServices = [
    WhatsappTimelineSeeder,
];
