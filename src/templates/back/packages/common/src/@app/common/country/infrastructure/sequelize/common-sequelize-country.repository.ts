import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuditingRunner, ICriteria, LiteralObject, SequelizeRepository } from '@aurorajs.dev/core';
import { CommonICountryRepository } from '../../domain/common-country.repository';
import { CommonCountry } from '../../domain/common-country.aggregate';
import { CommonCountryMapper } from '../../domain/common-country.mapper';
import { CommonCountryModel } from './common-sequelize-country.model';

@Injectable()
export class CommonSequelizeCountryRepository extends SequelizeRepository<CommonCountry, CommonCountryModel> implements CommonICountryRepository
{
    public readonly aggregateName: string = 'CommonCountry';
    public readonly mapper: CommonCountryMapper = new CommonCountryMapper();

    constructor(
        @InjectModel(CommonCountryModel)
        public readonly repository: typeof CommonCountryModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}