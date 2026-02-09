/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import {
  CommonCountry,
  CommonCountryMapper,
  CommonCountryModel,
  CommonICountryRepository,
} from '@app/common/country';
import {
  AuditingRunner,
  ICriteria,
  SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CommonSequelizeCountryRepository
  extends SequelizeRepository<CommonCountry, CommonCountryModel>
  implements CommonICountryRepository
{
  public readonly aggregateName: string = 'CommonCountry';
  public readonly mapper: CommonCountryMapper = new CommonCountryMapper();

  constructor(
    @InjectModel(CommonCountryModel)
    public readonly repository: typeof CommonCountryModel,
    public readonly criteria: ICriteria,
    public readonly auditingRunner: AuditingRunner,
  ) {
    super();
  }
}
