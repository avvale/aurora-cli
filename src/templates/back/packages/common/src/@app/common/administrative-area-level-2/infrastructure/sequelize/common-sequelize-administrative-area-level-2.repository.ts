/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel2,
  CommonAdministrativeAreaLevel2Mapper,
  CommonAdministrativeAreaLevel2Model,
  CommonIAdministrativeAreaLevel2Repository,
} from '@app/common/administrative-area-level-2';
import {
  AuditingRunner,
  ICriteria,
  SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CommonSequelizeAdministrativeAreaLevel2Repository
  extends SequelizeRepository<
    CommonAdministrativeAreaLevel2,
    CommonAdministrativeAreaLevel2Model
  >
  implements CommonIAdministrativeAreaLevel2Repository
{
  public readonly aggregateName: string = 'CommonAdministrativeAreaLevel2';
  public readonly mapper: CommonAdministrativeAreaLevel2Mapper =
    new CommonAdministrativeAreaLevel2Mapper();

  constructor(
    @InjectModel(CommonAdministrativeAreaLevel2Model)
    public readonly repository: typeof CommonAdministrativeAreaLevel2Model,
    public readonly criteria: ICriteria,
    public readonly auditingRunner: AuditingRunner,
  ) {
    super();
  }
}
