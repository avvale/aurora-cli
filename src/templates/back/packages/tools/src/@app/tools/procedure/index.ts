// export commands
export { ToolsCreateProcedureCommand } from './application/create/tools-create-procedure.command';
export { ToolsCreateProceduresCommand } from './application/create/tools-create-procedures.command';
export { ToolsUpdateProcedureByIdCommand } from './application/update/tools-update-procedure-by-id.command';
export { ToolsUpdateProceduresCommand } from './application/update/tools-update-procedures.command';
export { ToolsDeleteProcedureByIdCommand } from './application/delete/tools-delete-procedure-by-id.command';
export { ToolsDeleteProceduresCommand } from './application/delete/tools-delete-procedures.command';

// export queries
export { ToolsPaginateProceduresQuery } from './application/paginate/tools-paginate-procedures.query';
export { ToolsGetProceduresQuery } from './application/get/tools-get-procedures.query';
export { ToolsFindProcedureQuery } from './application/find/tools-find-procedure.query';
export { ToolsFindProcedureByIdQuery } from './application/find/tools-find-procedure-by-id.query';

// export mocks
export { toolsMockProcedureData } from './infrastructure/mock/tools-mock-procedure.data';
export { ToolsMockProcedureSeeder } from './infrastructure/mock/tools-mock-procedure.seeder';
export { ToolsMockProcedureRepository } from './infrastructure/mock/tools-mock-procedure.repository';

// export events
export { ToolsAddProceduresContextEvent } from './application/events/tools-add-procedures-context.event';
export { ToolsCreatedProceduresEvent } from './application/events/tools-created-procedures.event';
export { ToolsCreatedProcedureEvent } from './application/events/tools-created-procedure.event';
export { ToolsDeletedProceduresEvent } from './application/events/tools-deleted-procedures.event';
export { ToolsDeletedProcedureEvent } from './application/events/tools-deleted-procedure.event';
export { ToolsUpdatedProceduresEvent } from './application/events/tools-updated-procedures.event';
export { ToolsUpdatedProcedureEvent } from './application/events/tools-updated-procedure.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { ToolsProcedure } from './domain/tools-procedure.aggregate';
export { ToolsProcedureMapper } from './domain/tools-procedure.mapper';
export { ToolsIProcedureRepository } from './domain/tools-procedure.repository';
export { ToolsProcedureResponse } from './domain/tools-procedure.response';

// infrastructure
export { ToolsProcedureModel } from './infrastructure/sequelize/tools-sequelize-procedure.model';
export { ToolsSequelizeProcedureRepository } from './infrastructure/sequelize/tools-sequelize-procedure.repository';

// sagas
export { ToolsProcedureSagas } from './application/sagas/tools-procedure.sagas';

// command handlers
import { ToolsCreateProcedureCommandHandler } from './application/create/tools-create-procedure.command-handler';
import { ToolsCreateProceduresCommandHandler } from './application/create/tools-create-procedures.command-handler';
import { ToolsUpdateProcedureByIdCommandHandler } from './application/update/tools-update-procedure-by-id.command-handler';
import { ToolsUpdateProceduresCommandHandler } from './application/update/tools-update-procedures.command-handler';
import { ToolsDeleteProcedureByIdCommandHandler } from './application/delete/tools-delete-procedure-by-id.command-handler';
import { ToolsDeleteProceduresCommandHandler } from './application/delete/tools-delete-procedures.command-handler';

// query handlers
import { ToolsPaginateProceduresQueryHandler } from './application/paginate/tools-paginate-procedures.query-handler';
import { ToolsGetProceduresQueryHandler } from './application/get/tools-get-procedures.query-handler';
import { ToolsFindProcedureQueryHandler } from './application/find/tools-find-procedure.query-handler';
import { ToolsFindProcedureByIdQueryHandler } from './application/find/tools-find-procedure-by-id.query-handler';

// event handlers
import { ToolsCreatedProcedureEventHandler } from './application/events/tools-created-procedure.event-handler';
import { ToolsCreatedProceduresEventHandler } from './application/events/tools-created-procedures.event-handler';
import { ToolsUpdatedProcedureEventHandler } from './application/events/tools-updated-procedure.event-handler';
import { ToolsUpdatedProceduresEventHandler } from './application/events/tools-updated-procedures.event-handler';
import { ToolsDeletedProcedureEventHandler } from './application/events/tools-deleted-procedure.event-handler';
import { ToolsDeletedProceduresEventHandler } from './application/events/tools-deleted-procedures.event-handler';

// services
import { ToolsCreateProcedureService } from './application/create/tools-create-procedure.service';
import { ToolsCreateProceduresService } from './application/create/tools-create-procedures.service';
import { ToolsPaginateProceduresService } from './application/paginate/tools-paginate-procedures.service';
import { ToolsGetProceduresService } from './application/get/tools-get-procedures.service';
import { ToolsFindProcedureService } from './application/find/tools-find-procedure.service';
import { ToolsFindProcedureByIdService } from './application/find/tools-find-procedure-by-id.service';
import { ToolsUpdateProcedureByIdService } from './application/update/tools-update-procedure-by-id.service';
import { ToolsUpdateProceduresService } from './application/update/tools-update-procedures.service';
import { ToolsDeleteProcedureByIdService } from './application/delete/tools-delete-procedure-by-id.service';
import { ToolsDeleteProceduresService } from './application/delete/tools-delete-procedures.service';

export const ToolsProcedureHandlers = [
    // commands
    ToolsCreateProcedureCommandHandler,
    ToolsCreateProceduresCommandHandler,
    ToolsUpdateProcedureByIdCommandHandler,
    ToolsUpdateProceduresCommandHandler,
    ToolsDeleteProcedureByIdCommandHandler,
    ToolsDeleteProceduresCommandHandler,

    // queries
    ToolsPaginateProceduresQueryHandler,
    ToolsGetProceduresQueryHandler,
    ToolsFindProcedureQueryHandler,
    ToolsFindProcedureByIdQueryHandler,

    // events
    ToolsCreatedProcedureEventHandler,
    ToolsCreatedProceduresEventHandler,
    ToolsUpdatedProcedureEventHandler,
    ToolsUpdatedProceduresEventHandler,
    ToolsDeletedProcedureEventHandler,
    ToolsDeletedProceduresEventHandler,
];

export const ToolsProcedureServices = [
    ToolsCreateProcedureService,
    ToolsCreateProceduresService,
    ToolsPaginateProceduresService,
    ToolsGetProceduresService,
    ToolsFindProcedureService,
    ToolsFindProcedureByIdService,
    ToolsUpdateProcedureByIdService,
    ToolsUpdateProceduresService,
    ToolsDeleteProcedureByIdService,
    ToolsDeleteProceduresService,
];