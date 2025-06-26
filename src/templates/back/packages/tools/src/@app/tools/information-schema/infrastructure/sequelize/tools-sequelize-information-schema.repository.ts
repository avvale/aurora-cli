import { ToolsInformationSchemaMapper, ToolsInformationSchemaSqlRequest, ToolsInformationSchemaSqlResponse } from '@app/tools/information-schema';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ToolsSequelizeInformationSchemaRepository extends SequelizeRepository<ToolsInformationSchemaSqlRequest | ToolsInformationSchemaSqlResponse, new () => any>
{
    public readonly mapper: any = new ToolsInformationSchemaMapper();
    public readonly repository: any = { sequelize: Sequelize };

    constructor(
        public readonly sequelize: Sequelize,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();

        this.repository.sequelize = sequelize;
    }
}
