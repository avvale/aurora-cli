/* eslint-disable comma-dangle */
import { ToolsKeyValueHandlers, ToolsKeyValueServices, ToolsKeyValueModel, ToolsIKeyValueRepository, ToolsSequelizeKeyValueRepository, ToolsKeyValueSagas } from './key-value';
import { ToolsProcedureHandlers, ToolsProcedureServices, ToolsProcedureModel, ToolsIProcedureRepository, ToolsSequelizeProcedureRepository, ToolsProcedureSagas } from './procedure';
import { ToolsInformationSchemaHandlers, ToolsInformationSchemaServices, ToolsSequelizeInformationSchemaRepository } from './information-schema';
import { ToolsMigrationHandlers, ToolsMigrationServices, ToolsMigrationModel, ToolsIMigrationRepository, ToolsSequelizeMigrationRepository, ToolsMigrationSagas } from './migration';

export const ToolsHandlers = [
    ...ToolsKeyValueHandlers,
    ...ToolsProcedureHandlers,
    ...ToolsInformationSchemaHandlers,
    ...ToolsMigrationHandlers
];
export const ToolsServices = [
    ...ToolsKeyValueServices,
    ...ToolsProcedureServices,
    ...ToolsInformationSchemaServices,
    ...ToolsMigrationServices
];
export const ToolsModels = [
    ToolsKeyValueModel,
    ToolsProcedureModel,
    ToolsMigrationModel
];
export const ToolsRepositories = [
    {
        provide : ToolsIKeyValueRepository,
        useClass: ToolsSequelizeKeyValueRepository,
    },
    {
        provide : ToolsIProcedureRepository,
        useClass: ToolsSequelizeProcedureRepository,
    },
    ToolsSequelizeInformationSchemaRepository,
    {
        provide : ToolsIMigrationRepository,
        useClass: ToolsSequelizeMigrationRepository,
    }
];
export const ToolsSagas = [
    ToolsKeyValueSagas,
    ToolsProcedureSagas,
    ToolsMigrationSagas
];