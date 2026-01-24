import {
  SupportComment,
  SupportCommentMapper,
  SupportCommentModel,
  SupportICommentRepository,
} from '@app/support/comment';
import {
  AuditingRunner,
  ICriteria,
  SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SupportSequelizeCommentRepository
  extends SequelizeRepository<SupportComment, SupportCommentModel>
  implements SupportICommentRepository
{
  public readonly aggregateName: string = 'SupportComment';
  public readonly mapper: SupportCommentMapper = new SupportCommentMapper();

  constructor(
    @InjectModel(SupportCommentModel)
    public readonly repository: typeof SupportCommentModel,
    public readonly criteria: ICriteria,
    public readonly auditingRunner: AuditingRunner,
  ) {
    super();
  }
}
