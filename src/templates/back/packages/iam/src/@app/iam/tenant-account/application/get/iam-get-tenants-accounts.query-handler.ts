import {
  IamGetTenantsAccountsQuery,
  IamTenantAccount,
  IamTenantAccountMapper,
  IamTenantAccountResponse,
} from '@app/iam/tenant-account';
import { IamGetTenantsAccountsService } from '@app/iam/tenant-account/application/get/iam-get-tenants-accounts.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamGetTenantsAccountsQuery)
export class IamGetTenantsAccountsQueryHandler
  implements IQueryHandler<IamGetTenantsAccountsQuery>
{
  private readonly mapper: IamTenantAccountMapper =
    new IamTenantAccountMapper();

  constructor(
    private readonly getTenantsAccountsService: IamGetTenantsAccountsService,
  ) {}

  async execute(
    query: IamGetTenantsAccountsQuery,
  ): Promise<IamTenantAccountResponse[] | LiteralObject[]> {
    const models = await this.getTenantsAccountsService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    if (query.cQMetadata?.excludeMapModelToAggregate) return models;

    return this.mapper.mapAggregatesToResponses(models as IamTenantAccount[]);
  }
}
