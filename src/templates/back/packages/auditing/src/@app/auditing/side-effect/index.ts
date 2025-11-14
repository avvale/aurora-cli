// export commands
export { AuditingCreateSideEffectCommand } from './application/create/auditing-create-side-effect.command';
export { AuditingCreateSideEffectsCommand } from './application/create/auditing-create-side-effects.command';
export { AuditingDeleteSideEffectByIdCommand } from './application/delete/auditing-delete-side-effect-by-id.command';
export { AuditingDeleteSideEffectsCommand } from './application/delete/auditing-delete-side-effects.command';
export { AuditingUpdateSideEffectByIdCommand } from './application/update/auditing-update-side-effect-by-id.command';
export { AuditingUpdateSideEffectsCommand } from './application/update/auditing-update-side-effects.command';

// export queries
export { AuditingFindSideEffectByIdQuery } from './application/find/auditing-find-side-effect-by-id.query';
export { AuditingFindSideEffectQuery } from './application/find/auditing-find-side-effect.query';
export { AuditingGetSideEffectsQuery } from './application/get/auditing-get-side-effects.query';
export { AuditingPaginateSideEffectsQuery } from './application/paginate/auditing-paginate-side-effects.query';

// export mocks
export { auditingMockSideEffectData } from './infrastructure/mock/auditing-mock-side-effect.data';
export { AuditingMockSideEffectRepository } from './infrastructure/mock/auditing-mock-side-effect.repository';
export { AuditingMockSideEffectSeeder } from './infrastructure/mock/auditing-mock-side-effect.seeder';

// export events
export { AuditingAddSideEffectsContextEvent } from './application/events/auditing-add-side-effects-context.event';
export { AuditingCreatedSideEffectEvent } from './application/events/auditing-created-side-effect.event';
export { AuditingCreatedSideEffectsEvent } from './application/events/auditing-created-side-effects.event';
export { AuditingDeletedSideEffectEvent } from './application/events/auditing-deleted-side-effect.event';
export { AuditingDeletedSideEffectsEvent } from './application/events/auditing-deleted-side-effects.event';
export { AuditingUpdatedSideEffectEvent } from './application/events/auditing-updated-side-effect.event';
export { AuditingUpdatedSideEffectsEvent } from './application/events/auditing-updated-side-effects.event';

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
import { AuditingDeleteSideEffectByIdCommandHandler } from './application/delete/auditing-delete-side-effect-by-id.command-handler';
import { AuditingDeleteSideEffectsCommandHandler } from './application/delete/auditing-delete-side-effects.command-handler';
import { AuditingUpdateSideEffectByIdCommandHandler } from './application/update/auditing-update-side-effect-by-id.command-handler';
import { AuditingUpdateSideEffectsCommandHandler } from './application/update/auditing-update-side-effects.command-handler';

// query handlers
import { AuditingFindSideEffectByIdQueryHandler } from './application/find/auditing-find-side-effect-by-id.query-handler';
import { AuditingFindSideEffectQueryHandler } from './application/find/auditing-find-side-effect.query-handler';
import { AuditingGetSideEffectsQueryHandler } from './application/get/auditing-get-side-effects.query-handler';
import { AuditingPaginateSideEffectsQueryHandler } from './application/paginate/auditing-paginate-side-effects.query-handler';

// event handlers
import { AuditingCreatedSideEffectEventHandler } from './application/events/auditing-created-side-effect.event-handler';
import { AuditingCreatedSideEffectsEventHandler } from './application/events/auditing-created-side-effects.event-handler';
import { AuditingDeletedSideEffectEventHandler } from './application/events/auditing-deleted-side-effect.event-handler';
import { AuditingDeletedSideEffectsEventHandler } from './application/events/auditing-deleted-side-effects.event-handler';
import { AuditingUpdatedSideEffectEventHandler } from './application/events/auditing-updated-side-effect.event-handler';
import { AuditingUpdatedSideEffectsEventHandler } from './application/events/auditing-updated-side-effects.event-handler';

// services
import { AuditingCreateSideEffectService } from './application/create/auditing-create-side-effect.service';
import { AuditingCreateSideEffectsService } from './application/create/auditing-create-side-effects.service';
import { AuditingDeleteSideEffectByIdService } from './application/delete/auditing-delete-side-effect-by-id.service';
import { AuditingDeleteSideEffectsService } from './application/delete/auditing-delete-side-effects.service';
import { AuditingFindSideEffectByIdService } from './application/find/auditing-find-side-effect-by-id.service';
import { AuditingFindSideEffectService } from './application/find/auditing-find-side-effect.service';
import { AuditingGetSideEffectsService } from './application/get/auditing-get-side-effects.service';
import { AuditingPaginateSideEffectsService } from './application/paginate/auditing-paginate-side-effects.service';
import { AuditingUpdateSideEffectByIdService } from './application/update/auditing-update-side-effect-by-id.service';
import { AuditingUpdateSideEffectsService } from './application/update/auditing-update-side-effects.service';

export const AuditingSideEffectHandlers = [
    // commands
    AuditingCreateSideEffectCommandHandler,
    AuditingCreateSideEffectsCommandHandler,
    AuditingUpdateSideEffectByIdCommandHandler,
    AuditingUpdateSideEffectsCommandHandler,
    AuditingDeleteSideEffectByIdCommandHandler,
    AuditingDeleteSideEffectsCommandHandler,

    // queries
    AuditingPaginateSideEffectsQueryHandler,
    AuditingGetSideEffectsQueryHandler,
    AuditingFindSideEffectQueryHandler,
    AuditingFindSideEffectByIdQueryHandler,

    // events
    AuditingCreatedSideEffectEventHandler,
    AuditingCreatedSideEffectsEventHandler,
    AuditingUpdatedSideEffectEventHandler,
    AuditingUpdatedSideEffectsEventHandler,
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
    AuditingUpdateSideEffectByIdService,
    AuditingUpdateSideEffectsService,
    AuditingDeleteSideEffectByIdService,
    AuditingDeleteSideEffectsService,
];
