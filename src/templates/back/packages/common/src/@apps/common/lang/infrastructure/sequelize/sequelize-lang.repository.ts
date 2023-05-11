import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { ILangRepository } from '../../domain/lang.repository';
import { CommonLang } from '../../domain/lang.aggregate';
import { LangMapper } from '../../domain/lang.mapper';
import { CommonLangModel } from './sequelize-lang.model';

@Injectable()
export class SequelizeLangRepository extends SequelizeRepository<CommonLang, CommonLangModel> implements ILangRepository
{
    public readonly aggregateName: string = 'CommonLang';
    public readonly mapper: LangMapper = new LangMapper();

    constructor(
        @InjectModel(CommonLangModel)
        public readonly repository: typeof CommonLangModel,
        public readonly criteria: ICriteria,
    )
    {
        super();
    }
}