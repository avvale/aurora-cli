// export commands
export { ToolsRawSQLInformationSchemaCommand } from './application/raw-sql/tools-raw-sql-information-schema.command';

// export queries
export { ToolsRawSQLInformationSchemasQuery } from './application/raw-sql/tools-raw-sql-information-schemas.query';

// export mocks

// export events
export { ToolsCreatedInformationSchemaRequestEvent } from './application/events/tools-created-information-schema-request.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { ToolsInformationSchemaSqlRequest } from './domain/tools-information-schema-sql-request.aggregate';
export { ToolsInformationSchemaSqlResponse } from './domain/tools-information-schema-sql-response.aggregate';

export { ToolsInformationSchemaMapper } from './domain/tools-information-schema.mapper';
export { ToolsInformationSchemaResponse } from './domain/tools-information-schema.response';

// infrastructure
export { ToolsSequelizeInformationSchemaRepository } from './infrastructure/sequelize/tools-sequelize-information-schema.repository';

// sagas
// export { ToolsProcedureSagas } from './application/sagas/tools-procedure.sagas';

// command handlers
import { ToolsRawSQLInformationSchemaCommandHandler } from './application/raw-sql/tools-raw-sql-information-schema.command-handler';

// query handlers
import { ToolsRawSQLInformationSchemasQueryHandler } from './application/raw-sql/tools-raw-sql-information-schemas.query-handler';

// event handlers
import { ToolsCreatedInformationSchemaRequestEventHandler } from './application/events/tools-created-information-schema-request.event-handler';

// services
import { ToolsRawSQLInformationSchemasService } from './application/raw-sql/tools-raw-sql-information-schemas.service';
import { ToolsRawSQLInformationSchemaService } from './application/raw-sql/tools-raw-sql-information-schema.service';

export const ToolsInformationSchemaHandlers = [
    // commands
    ToolsRawSQLInformationSchemaCommandHandler,

    // queries
    ToolsRawSQLInformationSchemasQueryHandler,

    // events
    ToolsCreatedInformationSchemaRequestEventHandler,
];

export const ToolsInformationSchemaServices = [
    ToolsRawSQLInformationSchemasService,
    ToolsRawSQLInformationSchemaService,
];