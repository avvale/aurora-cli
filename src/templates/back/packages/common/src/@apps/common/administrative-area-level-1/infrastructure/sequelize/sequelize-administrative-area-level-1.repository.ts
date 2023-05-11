import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { IAdministrativeAreaLevel1Repository } from '../../domain/administrative-area-level-1.repository';
import { CommonAdministrativeAreaLevel1 } from '../../domain/administrative-area-level-1.aggregate';
import { AdministrativeAreaLevel1Mapper } from '../../domain/administrative-area-level-1.mapper';
import { CommonAdministrativeAreaLevel1Model } from './sequelize-administrative-area-level-1.model';

@Injectable()
export class SequelizeAdministrativeAreaLevel1Repository extends SequelizeRepository<CommonAdministrativeAreaLevel1, CommonAdministrativeAreaLevel1Model> implements IAdministrativeAreaLevel1Repository
{
    public readonly aggregateName: string = 'CommonAdministrativeAreaLevel1';
    public readonly mapper: AdministrativeAreaLevel1Mapper = new AdministrativeAreaLevel1Mapper();

    constructor(
        @InjectModel(CommonAdministrativeAreaLevel1Model)
        public readonly repository: typeof CommonAdministrativeAreaLevel1Model,
        public readonly criteria: ICriteria,
    )
    {
        super();
    }
}