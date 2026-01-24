import {
  IamGetTenantsQuery,
  IamTenant,
  IamTenantMapper,
  IamTenantResponse,
} from '@app/iam/tenant';
import { IamGetTenantsService } from '@app/iam/tenant/application/get/iam-get-tenants.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamGetTenantsQuery)
export class IamGetTenantsQueryHandler
  implements IQueryHandler<IamGetTenantsQuery>
{
  private readonly mapper: IamTenantMapper = new IamTenantMapper();

  constructor(private readonly getTenantsService: IamGetTenantsService) {}

  async execute(
    query: IamGetTenantsQuery,
  ): Promise<IamTenantResponse[] | LiteralObject[]> {
    const models = await this.getTenantsService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    if (query.cQMetadata?.excludeMapModelToAggregate) return models;

    return this.mapper.mapAggregatesToResponses(models as IamTenant[]);
  }
}
