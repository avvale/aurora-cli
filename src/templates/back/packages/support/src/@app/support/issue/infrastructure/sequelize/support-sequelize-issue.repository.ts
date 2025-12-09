import {
    SupportIIssueRepository,
    SupportIssue,
    SupportIssueMapper,
    SupportIssueModel,
} from '@app/support/issue';
import {
    AuditingRunner,
    ICriteria,
    SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SupportSequelizeIssueRepository
    extends SequelizeRepository<SupportIssue, SupportIssueModel>
    implements SupportIIssueRepository
{
    public readonly aggregateName: string = 'SupportIssue';
    public readonly mapper: SupportIssueMapper = new SupportIssueMapper();

    constructor(
        @InjectModel(SupportIssueModel)
        public readonly repository: typeof SupportIssueModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    ) {
        super();
    }
}
