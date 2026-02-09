/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import {
  CommonCountry,
  CommonCountryI18nModel,
  CommonCountryMapper,
  CommonICountryI18nRepository,
} from '@app/common/country';
import {
  AuditingRunner,
  ICriteria,
  SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CommonSequelizeCountryI18nRepository
  extends SequelizeRepository<CommonCountry, CommonCountryI18nModel>
  implements CommonICountryI18nRepository
{
  public readonly aggregateName: string = 'CommonCountry';
  public readonly mapper: CommonCountryMapper = new CommonCountryMapper();

  constructor(
    @InjectModel(CommonCountryI18nModel)
    public readonly repository: typeof CommonCountryI18nModel,
    public readonly criteria: ICriteria,
    public readonly auditingRunner: AuditingRunner,
  ) {
    super();
  }
}
