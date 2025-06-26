import { ToolsIProcedureRepository, ToolsProcedure, ToolsProcedureMapper, ToolsProcedureModel } from '@app/tools/procedure';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ToolsSequelizeProcedureRepository extends SequelizeRepository<ToolsProcedure, ToolsProcedureModel> implements ToolsIProcedureRepository
{
    public readonly aggregateName: string = 'ToolsProcedure';
    public readonly mapper: ToolsProcedureMapper = new ToolsProcedureMapper();

    constructor(
        @InjectModel(ToolsProcedureModel)
        public readonly repository: typeof ToolsProcedureModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
