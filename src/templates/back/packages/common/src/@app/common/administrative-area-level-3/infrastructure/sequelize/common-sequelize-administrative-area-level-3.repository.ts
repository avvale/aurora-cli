import { CommonAdministrativeAreaLevel3, CommonAdministrativeAreaLevel3Mapper, CommonAdministrativeAreaLevel3Model, CommonIAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CommonSequelizeAdministrativeAreaLevel3Repository extends SequelizeRepository<CommonAdministrativeAreaLevel3, CommonAdministrativeAreaLevel3Model> implements CommonIAdministrativeAreaLevel3Repository
{
    public readonly aggregateName: string = 'CommonAdministrativeAreaLevel3';
    public readonly mapper: CommonAdministrativeAreaLevel3Mapper = new CommonAdministrativeAreaLevel3Mapper();

    constructor(
        @InjectModel(CommonAdministrativeAreaLevel3Model)
        public readonly repository: typeof CommonAdministrativeAreaLevel3Model,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}