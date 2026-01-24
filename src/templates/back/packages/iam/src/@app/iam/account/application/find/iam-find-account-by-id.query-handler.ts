import {
  IamAccountMapper,
  IamAccountResponse,
  IamFindAccountByIdQuery,
} from '@app/iam/account';
import { IamFindAccountByIdService } from '@app/iam/account/application/find/iam-find-account-by-id.service';
import { IamAccountId } from '@app/iam/account/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamFindAccountByIdQuery)
export class IamFindAccountByIdQueryHandler
  implements IQueryHandler<IamFindAccountByIdQuery>
{
  private readonly mapper: IamAccountMapper = new IamAccountMapper();

  constructor(
    private readonly findAccountByIdService: IamFindAccountByIdService,
  ) {}

  async execute(query: IamFindAccountByIdQuery): Promise<IamAccountResponse> {
    const account = await this.findAccountByIdService.main(
      new IamAccountId(query.id),
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(account);
  }
}
