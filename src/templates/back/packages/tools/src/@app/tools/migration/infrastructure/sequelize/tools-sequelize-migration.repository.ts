import {
    ToolsIMigrationRepository,
    ToolsMigration,
    ToolsMigrationMapper,
    ToolsMigrationModel,
} from '@app/tools/migration';
import {
    AuditingRunner,
    ICriteria,
    SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ToolsSequelizeMigrationRepository
    extends SequelizeRepository<ToolsMigration, ToolsMigrationModel>
    implements ToolsIMigrationRepository
{
    public readonly aggregateName: string = 'ToolsMigration';
    public readonly mapper: ToolsMigrationMapper = new ToolsMigrationMapper();

    constructor(
        @InjectModel(ToolsMigrationModel)
        public readonly repository: typeof ToolsMigrationModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    ) {
        super();
    }
}
