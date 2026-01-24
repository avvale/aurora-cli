import {
  IamFindTenantAccountQuery,
  IamTenantAccountMapper,
  IamTenantAccountResponse,
} from '@app/iam/tenant-account';
import { IamFindTenantAccountService } from '@app/iam/tenant-account/application/find/iam-find-tenant-account.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamFindTenantAccountQuery)
export class IamFindTenantAccountQueryHandler
  implements IQueryHandler<IamFindTenantAccountQuery>
{
  private readonly mapper: IamTenantAccountMapper =
    new IamTenantAccountMapper();

  constructor(
    private readonly findTenantAccountService: IamFindTenantAccountService,
  ) {}

  async execute(
    query: IamFindTenantAccountQuery,
  ): Promise<IamTenantAccountResponse> {
    const tenantAccount = await this.findTenantAccountService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(tenantAccount);
  }
}
