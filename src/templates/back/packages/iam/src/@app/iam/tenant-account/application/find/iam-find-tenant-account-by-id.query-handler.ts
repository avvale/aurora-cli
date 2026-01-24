import {
  IamFindTenantAccountByIdQuery,
  IamTenantAccountMapper,
  IamTenantAccountResponse,
} from '@app/iam/tenant-account';
import { IamFindTenantAccountByIdService } from '@app/iam/tenant-account/application/find/iam-find-tenant-account-by-id.service';
import {
  IamTenantAccountAccountId,
  IamTenantAccountTenantId,
} from '@app/iam/tenant-account/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamFindTenantAccountByIdQuery)
export class IamFindTenantAccountByIdQueryHandler
  implements IQueryHandler<IamFindTenantAccountByIdQuery>
{
  private readonly mapper: IamTenantAccountMapper =
    new IamTenantAccountMapper();

  constructor(
    private readonly findTenantAccountByIdService: IamFindTenantAccountByIdService,
  ) {}

  async execute(
    query: IamFindTenantAccountByIdQuery,
  ): Promise<IamTenantAccountResponse> {
    const tenantAccount = await this.findTenantAccountByIdService.main(
      new IamTenantAccountTenantId(query.tenantId),
      new IamTenantAccountAccountId(query.accountId),
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(tenantAccount);
  }
}
