/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import {
  CommonIResourceRepository,
  CommonResource,
  CommonResourceMapper,
  CommonResourceModel,
} from '@app/common/resource';
import {
  AuditingRunner,
  ICriteria,
  SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CommonSequelizeResourceRepository
  extends SequelizeRepository<CommonResource, CommonResourceModel>
  implements CommonIResourceRepository
{
  public readonly aggregateName: string = 'CommonResource';
  public readonly mapper: CommonResourceMapper = new CommonResourceMapper();

  constructor(
    @InjectModel(CommonResourceModel)
    public readonly repository: typeof CommonResourceModel,
    public readonly criteria: ICriteria,
    public readonly auditingRunner: AuditingRunner,
  ) {
    super();
  }
}
