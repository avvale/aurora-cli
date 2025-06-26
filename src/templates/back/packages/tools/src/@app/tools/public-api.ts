/* eslint-disable comma-dangle */
import { ToolsKeyValueHandlers, ToolsKeyValueServices, ToolsKeyValueModel, ToolsIKeyValueRepository, ToolsSequelizeKeyValueRepository, ToolsKeyValueSagas } from './key-value';
import { ToolsProcedureHandlers, ToolsProcedureServices, ToolsProcedureModel, ToolsIProcedureRepository, ToolsSequelizeProcedureRepository, ToolsProcedureSagas } from './procedure';
import { ToolsInformationSchemaHandlers, ToolsInformationSchemaServices, ToolsSequelizeInformationSchemaRepository } from './information-schema';

export const ToolsHandlers = [
    ...ToolsKeyValueHandlers,
    ...ToolsProcedureHandlers,
    ...ToolsInformationSchemaHandlers,
];
export const ToolsServices = [
    ...ToolsKeyValueServices,
    ...ToolsProcedureServices,
    ...ToolsInformationSchemaServices,
];
export const ToolsModels = [
    ToolsKeyValueModel,
    ToolsProcedureModel,
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
];
export const ToolsSagas = [
    ToolsKeyValueSagas,
    ToolsProcedureSagas
];