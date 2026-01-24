import {
  CommonAttachment,
  CommonAttachmentMapper,
  CommonAttachmentModel,
  CommonIAttachmentRepository,
} from '@app/common/attachment';
import {
  AuditingRunner,
  ICriteria,
  SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CommonSequelizeAttachmentRepository
  extends SequelizeRepository<CommonAttachment, CommonAttachmentModel>
  implements CommonIAttachmentRepository
{
  public readonly aggregateName: string = 'CommonAttachment';
  public readonly mapper: CommonAttachmentMapper = new CommonAttachmentMapper();

  constructor(
    @InjectModel(CommonAttachmentModel)
    public readonly repository: typeof CommonAttachmentModel,
    public readonly criteria: ICriteria,
    public readonly auditingRunner: AuditingRunner,
  ) {
    super();
  }
}
