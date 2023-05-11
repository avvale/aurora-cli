import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { ICountryRepository } from '../../domain/country.repository';
import { CommonCountry } from '../../domain/country.aggregate';
import { CountryMapper } from '../../domain/country.mapper';
import { CommonCountryModel } from './sequelize-country.model';

@Injectable()
export class SequelizeCountryRepository extends SequelizeRepository<CommonCountry, CommonCountryModel> implements ICountryRepository
{
    public readonly aggregateName: string = 'CommonCountry';
    public readonly mapper: CountryMapper = new CountryMapper();

    constructor(
        @InjectModel(CommonCountryModel)
        public readonly repository: typeof CommonCountryModel,
        public readonly criteria: ICriteria,
    )
    {
        super();
    }
}