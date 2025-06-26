import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '@aurora/shared.module';
import { ToolsSeeder } from './tools.seeder';
import { ToolsModels, ToolsHandlers, ToolsServices, ToolsRepositories, ToolsSagas } from '@app/tools';
import { ToolsKeyValueApiControllers, ToolsKeyValueApiResolvers, ToolsKeyValueApiHandlers, ToolsKeyValueApiServices } from './key-value';
import { ToolsProcedureApiControllers, ToolsProcedureApiResolvers, ToolsProcedureApiHandlers, ToolsProcedureApiServices } from './procedure';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
            ...ToolsModels,
        ]),
    ],
    controllers: [
        ...ToolsKeyValueApiControllers,
        ...ToolsProcedureApiControllers
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
        ...ToolsProcedureApiServices
    ],
})
export class ToolsModule {}
