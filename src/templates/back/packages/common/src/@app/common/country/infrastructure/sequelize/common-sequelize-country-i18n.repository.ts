import { Injectable, LiteralObject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { CommonICountryI18nRepository } from '../../domain/common-country-i18n.repository';
import { CommonCountry } from '../../domain/common-country.aggregate';
import { CommonCountryMapper } from '../../domain/common-country.mapper';
import { CommonCountryI18nModel } from './common-sequelize-country-i18n.model';

@Injectable()
export class CommonSequelizeCountryI18nRepository extends SequelizeRepository<CommonCountry, CommonCountryI18nModel> implements CommonICountryI18nRepository
{
    public readonly aggregateName: string = 'CommonCountry';
    public readonly mapper: CommonCountryMapper = new CommonCountryMapper();

    constructor(
        @InjectModel(CommonCountryI18nModel)
        public readonly repository: typeof CommonCountryI18nModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}