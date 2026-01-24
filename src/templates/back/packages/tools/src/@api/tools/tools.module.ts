import {
  ToolsHandlers,
  ToolsModels,
  ToolsRepositories,
  ToolsSagas,
  ToolsServices,
} from '@app/tools';
import { SharedModule } from '@aurora/shared.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  ToolsKeyValueApiControllers,
  ToolsKeyValueApiHandlers,
  ToolsKeyValueApiResolvers,
  ToolsKeyValueApiServices,
} from './key-value';
import {
  ToolsMigrationApiControllers,
  ToolsMigrationApiHandlers,
  ToolsMigrationApiResolvers,
  ToolsMigrationApiServices,
} from './migration';
import {
  ToolsProcedureApiControllers,
  ToolsProcedureApiHandlers,
  ToolsProcedureApiResolvers,
  ToolsProcedureApiServices,
} from './procedure';
import { ToolsSeeder } from './tools.seeder';
import {
  ToolsWebhookApiControllers,
  ToolsWebhookApiHandlers,
  ToolsWebhookApiResolvers,
  ToolsWebhookApiServices,
} from './webhook';
import {
  ToolsWebhookLogApiControllers,
  ToolsWebhookLogApiHandlers,
  ToolsWebhookLogApiResolvers,
  ToolsWebhookLogApiServices,
} from './webhook-log';

@Module({
  imports: [SharedModule, SequelizeModule.forFeature([...ToolsModels])],
  controllers: [
    ...ToolsKeyValueApiControllers,
    ...ToolsProcedureApiControllers,
    ...ToolsMigrationApiControllers,
    ...ToolsWebhookApiControllers,
    ...ToolsWebhookLogApiControllers,
  ],
  providers: [
    ToolsSeeder,
    ...ToolsHandlers,
    ...ToolsServices,
    ...ToolsRepositories,
    ...ToolsSagas,
    ...ToolsKeyValueApiResolvers,
    ...ToolsKeyValueApiHandlers,
    ...ToolsKeyValueApiServices,
    ...ToolsProcedureApiResolvers,
    ...ToolsProcedureApiHandlers,
    ...ToolsProcedureApiServices,
    ...ToolsMigrationApiResolvers,
    ...ToolsMigrationApiHandlers,
    ...ToolsMigrationApiServices,
    ...ToolsWebhookApiResolvers,
    ...ToolsWebhookApiHandlers,
    ...ToolsWebhookApiServices,
    ...ToolsWebhookLogApiResolvers,
    ...ToolsWebhookLogApiHandlers,
    ...ToolsWebhookLogApiServices,
  ],
})
export class ToolsModule {}
