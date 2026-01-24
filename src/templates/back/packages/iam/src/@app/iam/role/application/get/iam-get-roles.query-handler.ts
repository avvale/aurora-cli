import {
  IamGetRolesQuery,
  IamRole,
  IamRoleMapper,
  IamRoleResponse,
} from '@app/iam/role';
import { IamGetRolesService } from '@app/iam/role/application/get/iam-get-roles.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamGetRolesQuery)
export class IamGetRolesQueryHandler
  implements IQueryHandler<IamGetRolesQuery>
{
  private readonly mapper: IamRoleMapper = new IamRoleMapper();

  constructor(private readonly getRolesService: IamGetRolesService) {}

  async execute(
    query: IamGetRolesQuery,
  ): Promise<IamRoleResponse[] | LiteralObject[]> {
    const models = await this.getRolesService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    if (query.cQMetadata?.excludeMapModelToAggregate) return models;

    return this.mapper.mapAggregatesToResponses(models as IamRole[]);
  }
}
