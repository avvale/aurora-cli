import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ICriteria, SequelizeRepository } from '@aurora-ts/core';
import { ICountryI18NRepository } from '../../domain/country-i18n.repository';
import { CommonCountry } from '../../domain/country.aggregate';
import { CountryMapper } from '../../domain/country.mapper';
import { CommonCountryI18NModel } from './sequelize-country-i18n.model';

@Injectable()
export class SequelizeCountryI18NRepository extends SequelizeRepository<CommonCountry, CommonCountryI18NModel> implements ICountryI18NRepository
{
    public readonly aggregateName: string = 'CommonCountry';
    public readonly mapper: CountryMapper = new CountryMapper();

    constructor(
        @InjectModel(CommonCountryI18NModel)
        public readonly repository: typeof CommonCountryI18NModel,
        public readonly criteria: ICriteria,
    )
    {
        super();
    }
}