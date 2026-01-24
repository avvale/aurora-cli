import {
  CommonAdministrativeAreaLevel1,
  CommonAdministrativeAreaLevel1Mapper,
  CommonAdministrativeAreaLevel1Model,
  CommonIAdministrativeAreaLevel1Repository,
} from '@app/common/administrative-area-level-1';
import {
  AuditingRunner,
  ICriteria,
  SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CommonSequelizeAdministrativeAreaLevel1Repository
  extends SequelizeRepository<
    CommonAdministrativeAreaLevel1,
    CommonAdministrativeAreaLevel1Model
  >
  implements CommonIAdministrativeAreaLevel1Repository
{
  public readonly aggregateName: string = 'CommonAdministrativeAreaLevel1';
  public readonly mapper: CommonAdministrativeAreaLevel1Mapper =
    new CommonAdministrativeAreaLevel1Mapper();

  constructor(
    @InjectModel(CommonAdministrativeAreaLevel1Model)
    public readonly repository: typeof CommonAdministrativeAreaLevel1Model,
    public readonly criteria: ICriteria,
    public readonly auditingRunner: AuditingRunner,
  ) {
    super();
  }
}
