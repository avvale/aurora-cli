// commands
import { CreateSideEffectCommandHandler } from './application/create/create-side-effect.command-handler';
import { CreateSideEffectsCommandHandler } from './application/create/create-side-effects.command-handler';
import { UpdateSideEffectByIdCommandHandler } from './application/update/update-side-effect-by-id.command-handler';
import { UpdateSideEffectsCommandHandler } from './application/update/update-side-effects.command-handler';
import { UpsertSideEffectCommandHandler } from './application/upsert/upsert-side-effect.command-handler';
import { DeleteSideEffectByIdCommandHandler } from './application/delete/delete-side-effect-by-id.command-handler';
import { DeleteSideEffectsCommandHandler } from './application/delete/delete-side-effects.command-handler';

// queries
import { PaginateSideEffectsQueryHandler } from './application/paginate/paginate-side-effects.query-handler';
import { GetSideEffectsQueryHandler } from './application/get/get-side-effects.query-handler';
import { FindSideEffectQueryHandler } from './application/find/find-side-effect.query-handler';
import { FindSideEffectByIdQueryHandler } from './application/find/find-side-effect-by-id.query-handler';
import { RawSQLSideEffectsQueryHandler } from './application/raw-sql/raw-sql-side-effects.query-handler';

// events
import { CreatedSideEffectEventHandler } from './application/events/created-side-effect.event-handler';
import { CreatedSideEffectsEventHandler } from './application/events/created-side-effects.event-handler';
import { UpdatedSideEffectEventHandler } from './application/events/updated-side-effect.event-handler';
import { UpdatedSideEffectsEventHandler } from './application/events/updated-side-effects.event-handler';
import { DeletedSideEffectEventHandler } from './application/events/deleted-side-effect.event-handler';
import { DeletedSideEffectsEventHandler } from './application/events/deleted-side-effects.event-handler';

// services
import { CreateSideEffectService } from './application/create/create-side-effect.service';
import { CreateSideEffectsService } from './application/create/create-side-effects.service';
import { PaginateSideEffectsService } from './application/paginate/paginate-side-effects.service';
import { GetSideEffectsService } from './application/get/get-side-effects.service';
import { FindSideEffectService } from './application/find/find-side-effect.service';
import { FindSideEffectByIdService } from './application/find/find-side-effect-by-id.service';
import { RawSQLSideEffectsService } from './application/raw-sql/raw-sql-side-effects.service';
import { UpdateSideEffectByIdService } from './application/update/update-side-effect-by-id.service';
import { UpdateSideEffectsService } from './application/update/update-side-effects.service';
import { UpsertSideEffectService } from './application/upsert/upsert-side-effect.service';
import { DeleteSideEffectByIdService } from './application/delete/delete-side-effect-by-id.service';
import { DeleteSideEffectsService } from './application/delete/delete-side-effects.service';

// models
export { AuditingSideEffectModel } from './infrastructure/sequelize/sequelize-side-effect.model';

// repository
export { ISideEffectRepository } from './domain/side-effect.repository';
export { SequelizeSideEffectRepository } from './infrastructure/sequelize/sequelize-side-effect.repository';

// sagas
export { SideEffectSagas } from './application/sagas/side-effect.sagas';

export const AuditingSideEffectHandlers = [
    // commands
    CreateSideEffectCommandHandler,
    CreateSideEffectsCommandHandler,
    UpdateSideEffectByIdCommandHandler,
    UpdateSideEffectsCommandHandler,
    UpsertSideEffectCommandHandler,
    DeleteSideEffectByIdCommandHandler,
    DeleteSideEffectsCommandHandler,

    // queries
    PaginateSideEffectsQueryHandler,
    GetSideEffectsQueryHandler,
    FindSideEffectQueryHandler,
    FindSideEffectByIdQueryHandler,
    RawSQLSideEffectsQueryHandler,

    // events
    CreatedSideEffectEventHandler,
    CreatedSideEffectsEventHandler,
    UpdatedSideEffectEventHandler,
    UpdatedSideEffectsEventHandler,
    DeletedSideEffectEventHandler,
    DeletedSideEffectsEventHandler,
];

export const AuditingSideEffectServices = [
    CreateSideEffectService,
    CreateSideEffectsService,
    PaginateSideEffectsService,
    GetSideEffectsService,
    FindSideEffectService,
    FindSideEffectByIdService,
    RawSQLSideEffectsService,
    UpdateSideEffectByIdService,
    UpdateSideEffectsService,
    UpsertSideEffectService,
    DeleteSideEffectByIdService,
    DeleteSideEffectsService,
];