import {
    IamITagRepository,
    IamTag,
    IamTagMapper,
    IamTagModel,
} from '@app/iam/tag';
import {
    AuditingRunner,
    ICriteria,
    SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class IamSequelizeTagRepository
    extends SequelizeRepository<IamTag, IamTagModel>
    implements IamITagRepository
{
    public readonly aggregateName: string = 'IamTag';
    public readonly mapper: IamTagMapper = new IamTagMapper();

    constructor(
        @InjectModel(IamTagModel)
        public readonly repository: typeof IamTagModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    ) {
        super();
    }
}
