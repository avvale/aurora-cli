// export commands
export { AuditingCreateSideEffectCommand } from './application/create/auditing-create-side-effect.command';
export { AuditingCreateSideEffectsCommand } from './application/create/auditing-create-side-effects.command';
export { AuditingUpdateSideEffectByIdCommand } from './application/update/auditing-update-side-effect-by-id.command';
export { AuditingUpdateSideEffectsCommand } from './application/update/auditing-update-side-effects.command';
export { AuditingUpdateAndIncrementSideEffectsCommand } from './application/update/auditing-update-and-increment-side-effects.command';
export { AuditingUpsertSideEffectCommand } from './application/upsert/auditing-upsert-side-effect.command';
export { AuditingDeleteSideEffectByIdCommand } from './application/delete/auditing-delete-side-effect-by-id.command';
export { AuditingDeleteSideEffectsCommand } from './application/delete/auditing-delete-side-effects.command';

// export queries
export { AuditingPaginateSideEffectsQuery } from './application/paginate/auditing-paginate-side-effects.query';
export { AuditingGetSideEffectsQuery } from './application/get/auditing-get-side-effects.query';
export { AuditingFindSideEffectQuery } from './application/find/auditing-find-side-effect.query';
export { AuditingFindSideEffectByIdQuery } from './application/find/auditing-find-side-effect-by-id.query';
export { AuditingRawSQLSideEffectsQuery } from './application/raw-sql/auditing-raw-sql-side-effects.query';
export { AuditingCountSideEffectQuery } from './application/count/auditing-count-side-effect.query';
export { AuditingMaxSideEffectQuery } from './application/max/auditing-max-side-effect.query';
export { AuditingMinSideEffectQuery } from './application/min/auditing-min-side-effect.query';
export { AuditingSumSideEffectQuery } from './application/sum/auditing-sum-side-effect.query';

// export mocks
export { auditingMockSideEffectData } from './infrastructure/mock/auditing-mock-side-effect.data';
export { AuditingMockSideEffectSeeder } from './infrastructure/mock/auditing-mock-side-effect.seeder';
export { AuditingMockSideEffectRepository } from './infrastructure/mock/auditing-mock-side-effect.repository';

// export events
export { AuditingAddSideEffectsContextEvent } from './application/events/auditing-add-side-effects-context.event';
export { AuditingCreatedSideEffectsEvent } from './application/events/auditing-created-side-effects.event';
export { AuditingCreatedSideEffectEvent } from './application/events/auditing-created-side-effect.event';
export { AuditingDeletedSideEffectsEvent } from './application/events/auditing-deleted-side-effects.event';
export { AuditingDeletedSideEffectEvent } from './application/events/auditing-deleted-side-effect.event';
export { AuditingUpdatedSideEffectsEvent } from './application/events/auditing-updated-side-effects.event';
export { AuditingUpdatedSideEffectEvent } from './application/events/auditing-updated-side-effect.event';
export { AuditingUpdatedAndIncrementedSideEffectsEvent } from './application/events/auditing-updated-and-incremented-side-effects.event';
export { AuditingUpdatedAndIncrementedSideEffectEvent } from './application/events/auditing-updated-and-incremented-side-effect.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { AuditingSideEffect } from './domain/auditing-side-effect.aggregate';
export { AuditingSideEffectMapper } from './domain/auditing-side-effect.mapper';
export { AuditingISideEffectRepository } from './domain/auditing-side-effect.repository';
export { AuditingSideEffectResponse } from './domain/auditing-side-effect.response';

// infrastructure
export { AuditingSideEffectModel } from './infrastructure/sequelize/auditing-sequelize-side-effect.model';
export { AuditingSequelizeSideEffectRepository } from './infrastructure/sequelize/auditing-sequelize-side-effect.repository';

// sagas
export { AuditingSideEffectSagas } from './application/sagas/auditing-side-effect.sagas';

// command handlers
import { AuditingCreateSideEffectCommandHandler } from './application/create/auditing-create-side-effect.command-handler';
import { AuditingCreateSideEffectsCommandHandler } from './application/create/auditing-create-side-effects.command-handler';
import { AuditingUpdateSideEffectByIdCommandHandler } from './application/update/auditing-update-side-effect-by-id.command-handler';
import { AuditingUpdateSideEffectsCommandHandler } from './application/update/auditing-update-side-effects.command-handler';
import { AuditingUpdateAndIncrementSideEffectsCommandHandler } from './application/update/auditing-update-and-increment-side-effects.command-handler';
import { AuditingUpsertSideEffectCommandHandler } from './application/upsert/auditing-upsert-side-effect.command-handler';
import { AuditingDeleteSideEffectByIdCommandHandler } from './application/delete/auditing-delete-side-effect-by-id.command-handler';
import { AuditingDeleteSideEffectsCommandHandler } from './application/delete/auditing-delete-side-effects.command-handler';

// query handlers
import { AuditingPaginateSideEffectsQueryHandler } from './application/paginate/auditing-paginate-side-effects.query-handler';
import { AuditingGetSideEffectsQueryHandler } from './application/get/auditing-get-side-effects.query-handler';
import { AuditingFindSideEffectQueryHandler } from './application/find/auditing-find-side-effect.query-handler';
import { AuditingFindSideEffectByIdQueryHandler } from './application/find/auditing-find-side-effect-by-id.query-handler';
import { AuditingRawSQLSideEffectsQueryHandler } from './application/raw-sql/auditing-raw-sql-side-effects.query-handler';
import { AuditingCountSideEffectQueryHandler } from './application/count/auditing-count-side-effect.query-handler';
import { AuditingMaxSideEffectQueryHandler } from './application/max/auditing-max-side-effect.query-handler';
import { AuditingMinSideEffectQueryHandler } from './application/min/auditing-min-side-effect.query-handler';
import { AuditingSumSideEffectQueryHandler } from './application/sum/auditing-sum-side-effect.query-handler';

// event handlers
import { AuditingCreatedSideEffectEventHandler } from './application/events/auditing-created-side-effect.event-handler';
import { AuditingCreatedSideEffectsEventHandler } from './application/events/auditing-created-side-effects.event-handler';
import { AuditingUpdatedSideEffectEventHandler } from './application/events/auditing-updated-side-effect.event-handler';
import { AuditingUpdatedSideEffectsEventHandler } from './application/events/auditing-updated-side-effects.event-handler';
import { AuditingUpdatedAndIncrementedSideEffectsEventHandler } from './application/events/auditing-updated-and-incremented-side-effects.event-handler';
import { AuditingDeletedSideEffectEventHandler } from './application/events/auditing-deleted-side-effect.event-handler';
import { AuditingDeletedSideEffectsEventHandler } from './application/events/auditing-deleted-side-effects.event-handler';

// services
import { AuditingCreateSideEffectService } from './application/create/auditing-create-side-effect.service';
import { AuditingCreateSideEffectsService } from './application/create/auditing-create-side-effects.service';
import { AuditingPaginateSideEffectsService } from './application/paginate/auditing-paginate-side-effects.service';
import { AuditingGetSideEffectsService } from './application/get/auditing-get-side-effects.service';
import { AuditingFindSideEffectService } from './application/find/auditing-find-side-effect.service';
import { AuditingFindSideEffectByIdService } from './application/find/auditing-find-side-effect-by-id.service';
import { AuditingRawSQLSideEffectsService } from './application/raw-sql/auditing-raw-sql-side-effects.service';
import { AuditingCountSideEffectService } from './application/count/auditing-count-side-effect.service';
import { AuditingMaxSideEffectService } from './application/max/auditing-max-side-effect.service';
import { AuditingMinSideEffectService } from './application/min/auditing-min-side-effect.service';
import { AuditingSumSideEffectService } from './application/sum/auditing-sum-side-effect.service';
import { AuditingUpdateSideEffectByIdService } from './application/update/auditing-update-side-effect-by-id.service';
import { AuditingUpdateSideEffectsService } from './application/update/auditing-update-side-effects.service';
import { AuditingUpdateAndIncrementSideEffectsService } from './application/update/auditing-update-and-increment-side-effects.service';
import { AuditingUpsertSideEffectService } from './application/upsert/auditing-upsert-side-effect.service';
import { AuditingDeleteSideEffectByIdService } from './application/delete/auditing-delete-side-effect-by-id.service';
import { AuditingDeleteSideEffectsService } from './application/delete/auditing-delete-side-effects.service';

export const AuditingSideEffectHandlers = [
    // commands
    AuditingCreateSideEffectCommandHandler,
    AuditingCreateSideEffectsCommandHandler,
    AuditingUpdateSideEffectByIdCommandHandler,
    AuditingUpdateSideEffectsCommandHandler,
    AuditingUpdateAndIncrementSideEffectsCommandHandler,
    AuditingUpsertSideEffectCommandHandler,
    AuditingDeleteSideEffectByIdCommandHandler,
    AuditingDeleteSideEffectsCommandHandler,

    // queries
    AuditingPaginateSideEffectsQueryHandler,
    AuditingGetSideEffectsQueryHandler,
    AuditingFindSideEffectQueryHandler,
    AuditingFindSideEffectByIdQueryHandler,
    AuditingRawSQLSideEffectsQueryHandler,
    AuditingCountSideEffectQueryHandler,
    AuditingMaxSideEffectQueryHandler,
    AuditingMinSideEffectQueryHandler,
    AuditingSumSideEffectQueryHandler,

    // events
    AuditingCreatedSideEffectEventHandler,
    AuditingCreatedSideEffectsEventHandler,
    AuditingUpdatedSideEffectEventHandler,
    AuditingUpdatedSideEffectsEventHandler,
    AuditingUpdatedAndIncrementedSideEffectsEventHandler,
    AuditingDeletedSideEffectEventHandler,
    AuditingDeletedSideEffectsEventHandler,
];

export const AuditingSideEffectServices = [
    AuditingCreateSideEffectService,
    AuditingCreateSideEffectsService,
    AuditingPaginateSideEffectsService,
    AuditingGetSideEffectsService,
    AuditingFindSideEffectService,
    AuditingFindSideEffectByIdService,
    AuditingRawSQLSideEffectsService,
    AuditingCountSideEffectService,
    AuditingMaxSideEffectService,
    AuditingMinSideEffectService,
    AuditingSumSideEffectService,
    AuditingUpdateSideEffectByIdService,
    AuditingUpdateSideEffectsService,
    AuditingUpdateAndIncrementSideEffectsService,
    AuditingUpsertSideEffectService,
    AuditingDeleteSideEffectByIdService,
    AuditingDeleteSideEffectsService,
];