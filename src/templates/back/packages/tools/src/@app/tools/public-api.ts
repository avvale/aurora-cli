/* eslint-disable comma-dangle */
import {
    ToolsInformationSchemaHandlers,
    ToolsInformationSchemaServices,
    ToolsSequelizeInformationSchemaRepository,
} from './information-schema';
import {
    ToolsIKeyValueRepository,
    ToolsKeyValueHandlers,
    ToolsKeyValueModel,
    ToolsKeyValueSagas,
    ToolsKeyValueServices,
    ToolsSequelizeKeyValueRepository,
} from './key-value';
import {
    ToolsIMigrationRepository,
    ToolsMigrationHandlers,
    ToolsMigrationModel,
    ToolsMigrationSagas,
    ToolsMigrationServices,
    ToolsSequelizeMigrationRepository,
} from './migration';
import {
    ToolsIProcedureRepository,
    ToolsProcedureHandlers,
    ToolsProcedureModel,
    ToolsProcedureSagas,
    ToolsProcedureServices,
    ToolsSequelizeProcedureRepository,
} from './procedure';
import {
    ToolsIWebhookRepository,
    ToolsSequelizeWebhookRepository,
    ToolsWebhookHandlers,
    ToolsWebhookModel,
    ToolsWebhookSagas,
    ToolsWebhookServices,
} from './webhook';
import { ToolsWebhookLogHandlers, ToolsWebhookLogServices, ToolsWebhookLogModel, ToolsIWebhookLogRepository, ToolsSequelizeWebhookLogRepository, ToolsWebhookLogSagas } from './webhook-log';

export const ToolsHandlers = [
    ...ToolsKeyValueHandlers,
    ...ToolsProcedureHandlers,
    ...ToolsInformationSchemaHandlers,
    ...ToolsMigrationHandlers,
    ...ToolsWebhookHandlers,
    ...ToolsWebhookLogHandlers
];
export const ToolsServices = [
    ...ToolsKeyValueServices,
    ...ToolsProcedureServices,
    ...ToolsInformationSchemaServices,
    ...ToolsMigrationServices,
    ...ToolsWebhookServices,
    ...ToolsWebhookLogServices
];
export const ToolsModels = [
    ToolsKeyValueModel,
    ToolsProcedureModel,
    ToolsMigrationModel,
    ToolsWebhookModel,
    ToolsWebhookLogModel
];
export const ToolsRepositories = [
    {
        provide: ToolsIKeyValueRepository,
        useClass: ToolsSequelizeKeyValueRepository,
    },
    {
        provide: ToolsIProcedureRepository,
        useClass: ToolsSequelizeProcedureRepository,
    },
    ToolsSequelizeInformationSchemaRepository,
    {
        provide: ToolsIMigrationRepository,
        useClass: ToolsSequelizeMigrationRepository,
    },
    {
        provide: ToolsIWebhookRepository,
        useClass: ToolsSequelizeWebhookRepository,
    },
    {
        provide : ToolsIWebhookLogRepository,
        useClass: ToolsSequelizeWebhookLogRepository,
    }
];
export const ToolsSagas = [
    ToolsKeyValueSagas,
    ToolsProcedureSagas,
    ToolsMigrationSagas,
    ToolsWebhookSagas,
    ToolsWebhookLogSagas
];
