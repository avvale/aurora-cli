import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { ICountryI18nRepository } from '../../domain/country-i18n.repository';
import { CommonCountry } from '../../domain/country.aggregate';
import { CountryMapper } from '../../domain/country.mapper';
import { CommonCountryI18nModel } from './sequelize-country-i18n.model';

@Injectable()
export class SequelizeCountryI18nRepository extends SequelizeRepository<CommonCountry, CommonCountryI18nModel> implements ICountryI18nRepository
{
    public readonly aggregateName: string = 'CommonCountry';
    public readonly mapper: CountryMapper = new CountryMapper();

    constructor(
        @InjectModel(CommonCountryI18nModel)
        public readonly repository: typeof CommonCountryI18nModel,
        public readonly criteria: ICriteria,
    )
    {
        super();
    }
}