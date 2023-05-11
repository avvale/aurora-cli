import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { IAdministrativeAreaLevel2Repository } from '../../domain/administrative-area-level-2.repository';
import { CommonAdministrativeAreaLevel2 } from '../../domain/administrative-area-level-2.aggregate';
import { AdministrativeAreaLevel2Mapper } from '../../domain/administrative-area-level-2.mapper';
import { CommonAdministrativeAreaLevel2Model } from './sequelize-administrative-area-level-2.model';

@Injectable()
export class SequelizeAdministrativeAreaLevel2Repository extends SequelizeRepository<CommonAdministrativeAreaLevel2, CommonAdministrativeAreaLevel2Model> implements IAdministrativeAreaLevel2Repository
{
    public readonly aggregateName: string = 'CommonAdministrativeAreaLevel2';
    public readonly mapper: AdministrativeAreaLevel2Mapper = new AdministrativeAreaLevel2Mapper();

    constructor(
        @InjectModel(CommonAdministrativeAreaLevel2Model)
        public readonly repository: typeof CommonAdministrativeAreaLevel2Model,
        public readonly criteria: ICriteria,
    )
    {
        super();
    }
}