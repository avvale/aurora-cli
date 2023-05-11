import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { IAdministrativeAreaLevel3Repository } from '../../domain/administrative-area-level-3.repository';
import { CommonAdministrativeAreaLevel3 } from '../../domain/administrative-area-level-3.aggregate';
import { AdministrativeAreaLevel3Mapper } from '../../domain/administrative-area-level-3.mapper';
import { CommonAdministrativeAreaLevel3Model } from './sequelize-administrative-area-level-3.model';

@Injectable()
export class SequelizeAdministrativeAreaLevel3Repository extends SequelizeRepository<CommonAdministrativeAreaLevel3, CommonAdministrativeAreaLevel3Model> implements IAdministrativeAreaLevel3Repository
{
    public readonly aggregateName: string = 'CommonAdministrativeAreaLevel3';
    public readonly mapper: AdministrativeAreaLevel3Mapper = new AdministrativeAreaLevel3Mapper();

    constructor(
        @InjectModel(CommonAdministrativeAreaLevel3Model)
        public readonly repository: typeof CommonAdministrativeAreaLevel3Model,
        public readonly criteria: ICriteria,
    )
    {
        super();
    }
}