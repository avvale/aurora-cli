import {
  CommonAttachmentFamily,
  CommonAttachmentFamilyMapper,
  CommonAttachmentFamilyModel,
  CommonIAttachmentFamilyRepository,
} from '@app/common/attachment-family';
import {
  AuditingRunner,
  ICriteria,
  SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CommonSequelizeAttachmentFamilyRepository
  extends SequelizeRepository<
    CommonAttachmentFamily,
    CommonAttachmentFamilyModel
  >
  implements CommonIAttachmentFamilyRepository
{
  public readonly aggregateName: string = 'CommonAttachmentFamily';
  public readonly mapper: CommonAttachmentFamilyMapper =
    new CommonAttachmentFamilyMapper();

  constructor(
    @InjectModel(CommonAttachmentFamilyModel)
    public readonly repository: typeof CommonAttachmentFamilyModel,
    public readonly criteria: ICriteria,
    public readonly auditingRunner: AuditingRunner,
  ) {
    super();
  }
}
