import { ToolsIKeyValueRepository, ToolsKeyValue, ToolsKeyValueMapper, ToolsKeyValueModel } from '@app/tools/key-value';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ToolsSequelizeKeyValueRepository extends SequelizeRepository<ToolsKeyValue, ToolsKeyValueModel> implements ToolsIKeyValueRepository
{
    public readonly aggregateName: string = 'ToolsKeyValue';
    public readonly mapper: ToolsKeyValueMapper = new ToolsKeyValueMapper();

    constructor(
        @InjectModel(ToolsKeyValueModel)
        public readonly repository: typeof ToolsKeyValueModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
