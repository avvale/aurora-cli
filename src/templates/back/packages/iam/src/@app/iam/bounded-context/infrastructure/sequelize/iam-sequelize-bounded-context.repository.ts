import {
    IamBoundedContext,
    IamBoundedContextMapper,
    IamBoundedContextModel,
    IamIBoundedContextRepository,
} from '@app/iam/bounded-context';
import {
    AuditingRunner,
    ICriteria,
    SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class IamSequelizeBoundedContextRepository
    extends SequelizeRepository<IamBoundedContext, IamBoundedContextModel>
    implements IamIBoundedContextRepository
{
    public readonly aggregateName: string = 'IamBoundedContext';
    public readonly mapper: IamBoundedContextMapper =
        new IamBoundedContextMapper();

    constructor(
        @InjectModel(IamBoundedContextModel)
        public readonly repository: typeof IamBoundedContextModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    ) {
        super();
    }
}
