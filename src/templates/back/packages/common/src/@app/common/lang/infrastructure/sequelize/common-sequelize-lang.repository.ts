/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import {
  CommonILangRepository,
  CommonLang,
  CommonLangMapper,
  CommonLangModel,
} from '@app/common/lang';
import {
  AuditingRunner,
  ICriteria,
  SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CommonSequelizeLangRepository
  extends SequelizeRepository<CommonLang, CommonLangModel>
  implements CommonILangRepository
{
  public readonly aggregateName: string = 'CommonLang';
  public readonly mapper: CommonLangMapper = new CommonLangMapper();

  constructor(
    @InjectModel(CommonLangModel)
    public readonly repository: typeof CommonLangModel,
    public readonly criteria: ICriteria,
    public readonly auditingRunner: AuditingRunner,
  ) {
    super();
  }
}
