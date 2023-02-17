// controllers
import { AuditingCreateSideEffectController } from './controllers/auditing-create-side-effect.controller';
import { AuditingCreateSideEffectsController } from './controllers/auditing-create-side-effects.controller';
import { AuditingPaginateSideEffectsController } from './controllers/auditing-paginate-side-effects.controller';
import { AuditingGetSideEffectsController } from './controllers/auditing-get-side-effects.controller';
import { AuditingFindSideEffectByIdController } from './controllers/auditing-find-side-effect-by-id.controller';
import { AuditingFindSideEffectController } from './controllers/auditing-find-side-effect.controller';
import { AuditingUpdateSideEffectByIdController } from './controllers/auditing-update-side-effect-by-id.controller';
import { AuditingUpdateSideEffectsController } from './controllers/auditing-update-side-effects.controller';
import { AuditingUpsertSideEffectController } from './controllers/auditing-upsert-side-effect.controller';
import { AuditingDeleteSideEffectByIdController } from './controllers/auditing-delete-side-effect-by-id.controller';
import { AuditingDeleteSideEffectsController } from './controllers/auditing-delete-side-effects.controller';

// additionalApis
import { AuditingRollbackSideEffectController } from './controllers/auditing-rollback-side-effect.controller';

// resolvers
import { AuditingCreateSideEffectResolver } from './resolvers/auditing-create-side-effect.resolver';
import { AuditingCreateSideEffectsResolver } from './resolvers/auditing-create-side-effects.resolver';
import { AuditingPaginateSideEffectsResolver } from './resolvers/auditing-paginate-side-effects.resolver';
import { AuditingGetSideEffectsResolver } from './resolvers/auditing-get-side-effects.resolver';
import { AuditingFindSideEffectByIdResolver } from './resolvers/auditing-find-side-effect-by-id.resolver';
import { AuditingFindSideEffectResolver } from './resolvers/auditing-find-side-effect.resolver';
import { AuditingUpdateSideEffectByIdResolver } from './resolvers/auditing-update-side-effect-by-id.resolver';
import { AuditingUpdateSideEffectsResolver } from './resolvers/auditing-update-side-effects.resolver';
import { AuditingUpsertSideEffectResolver } from './resolvers/auditing-upsert-side-effect.resolver';
import { AuditingDeleteSideEffectByIdResolver } from './resolvers/auditing-delete-side-effect-by-id.resolver';
import { AuditingDeleteSideEffectsResolver } from './resolvers/auditing-delete-side-effects.resolver';

// additionalApis
import { AuditingRollbackSideEffectResolver } from './resolvers/auditing-rollback-side-effect.resolver';

// handlers
import { AuditingCreateSideEffectHandler } from './handlers/auditing-create-side-effect.handler';
import { AuditingCreateSideEffectsHandler } from './handlers/auditing-create-side-effects.handler';
import { AuditingPaginateSideEffectsHandler } from './handlers/auditing-paginate-side-effects.handler';
import { AuditingGetSideEffectsHandler } from './handlers/auditing-get-side-effects.handler';
import { AuditingFindSideEffectByIdHandler } from './handlers/auditing-find-side-effect-by-id.handler';
import { AuditingFindSideEffectHandler } from './handlers/auditing-find-side-effect.handler';
import { AuditingUpdateSideEffectByIdHandler } from './handlers/auditing-update-side-effect-by-id.handler';
import { AuditingUpdateSideEffectsHandler } from './handlers/auditing-update-side-effects.handler';
import { AuditingUpsertSideEffectHandler } from './handlers/auditing-upsert-side-effect.handler';
import { AuditingDeleteSideEffectByIdHandler } from './handlers/auditing-delete-side-effect-by-id.handler';
import { AuditingDeleteSideEffectsHandler } from './handlers/auditing-delete-side-effects.handler';

// seeder
import { AuditingSideEffectSeeder } from './seeder/auditing-side-effect.seeder';

// additionalApis
import { AuditingRollbackSideEffectHandler } from './handlers/auditing-rollback-side-effect.handler';

export const AuditingSideEffectControllers = [
    AuditingCreateSideEffectController,
    AuditingCreateSideEffectsController,
    AuditingPaginateSideEffectsController,
    AuditingGetSideEffectsController,
    AuditingFindSideEffectByIdController,
    AuditingFindSideEffectController,
    AuditingUpdateSideEffectByIdController,
    AuditingUpdateSideEffectsController,
    AuditingUpsertSideEffectController,
    AuditingDeleteSideEffectByIdController,
    AuditingDeleteSideEffectsController,

    // additionalApis
    AuditingRollbackSideEffectController,
];

export const AuditingSideEffectResolvers = [
    AuditingCreateSideEffectResolver,
    AuditingCreateSideEffectsResolver,
    AuditingPaginateSideEffectsResolver,
    AuditingGetSideEffectsResolver,
    AuditingFindSideEffectByIdResolver,
    AuditingFindSideEffectResolver,
    AuditingUpdateSideEffectByIdResolver,
    AuditingUpdateSideEffectsResolver,
    AuditingUpsertSideEffectResolver,
    AuditingDeleteSideEffectByIdResolver,
    AuditingDeleteSideEffectsResolver,

    // additionalApis
    AuditingRollbackSideEffectResolver,
];

export const AuditingSideEffectApiHandlers = [
    AuditingCreateSideEffectHandler,
    AuditingCreateSideEffectsHandler,
    AuditingPaginateSideEffectsHandler,
    AuditingGetSideEffectsHandler,
    AuditingFindSideEffectByIdHandler,
    AuditingFindSideEffectHandler,
    AuditingUpdateSideEffectByIdHandler,
    AuditingUpdateSideEffectsHandler,
    AuditingUpsertSideEffectHandler,
    AuditingDeleteSideEffectByIdHandler,
    AuditingDeleteSideEffectsHandler,

    // additionalApis
    AuditingRollbackSideEffectHandler,
];

export const AuditingSideEffectServices = [
    AuditingSideEffectSeeder,
];