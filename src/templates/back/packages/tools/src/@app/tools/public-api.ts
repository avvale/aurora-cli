/* eslint-disable comma-dangle */
import { ToolsKeyValueHandlers, ToolsKeyValueServices, ToolsKeyValueModel, ToolsIKeyValueRepository, ToolsSequelizeKeyValueRepository, ToolsKeyValueSagas } from './key-value';
import { ToolsProcedureHandlers, ToolsProcedureServices, ToolsProcedureModel, ToolsIProcedureRepository, ToolsSequelizeProcedureRepository, ToolsProcedureSagas } from './procedure';
import { ToolsInformationSchemaHandlers, ToolsInformationSchemaServices, ToolsSequelizeInformationSchemaRepository } from './information-schema';
import { ToolsMigrationHandlers, ToolsMigrationServices, ToolsMigrationModel, ToolsIMigrationRepository, ToolsSequelizeMigrationRepository, ToolsMigrationSagas } from './migration';
import { ToolsWebhookHandlers, ToolsWebhookServices, ToolsWebhookModel, ToolsIWebhookRepository, ToolsSequelizeWebhookRepository, ToolsWebhookSagas } from './webhook';

export const ToolsHandlers = [
    ...ToolsKeyValueHandlers,
    ...ToolsProcedureHandlers,
    ...ToolsInformationSchemaHandlers,
    ...ToolsMigrationHandlers,
    ...ToolsWebhookHandlers
];
export const ToolsServices = [
    ...ToolsKeyValueServices,
    ...ToolsProcedureServices,
    ...ToolsInformationSchemaServices,
    ...ToolsMigrationServices,
    ...ToolsWebhookServices
];
export const ToolsModels = [
    ToolsKeyValueModel,
    ToolsProcedureModel,
    ToolsMigrationModel,
    ToolsWebhookModel
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
    },
    {
        provide : ToolsIWebhookRepository,
        useClass: ToolsSequelizeWebhookRepository,
    }
];
export const ToolsSagas = [
    ToolsKeyValueSagas,
    ToolsProcedureSagas,
    ToolsMigrationSagas,
    ToolsWebhookSagas
];