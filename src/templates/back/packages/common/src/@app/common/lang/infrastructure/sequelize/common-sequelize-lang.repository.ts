import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuditingRunner, ICriteria, LiteralObject, SequelizeRepository } from '@aurorajs.dev/core';
import { CommonILangRepository } from '../../domain/common-lang.repository';
import { CommonLang } from '../../domain/common-lang.aggregate';
import { CommonLangMapper } from '../../domain/common-lang.mapper';
import { CommonLangModel } from './common-sequelize-lang.model';

@Injectable()
export class CommonSequelizeLangRepository extends SequelizeRepository<CommonLang, CommonLangModel> implements CommonILangRepository
{
    public readonly aggregateName: string = 'CommonLang';
    public readonly mapper: CommonLangMapper = new CommonLangMapper();

    constructor(
        @InjectModel(CommonLangModel)
        public readonly repository: typeof CommonLangModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}