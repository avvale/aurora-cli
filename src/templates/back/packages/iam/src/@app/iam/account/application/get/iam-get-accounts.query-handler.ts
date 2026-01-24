import {
  IamAccount,
  IamAccountMapper,
  IamAccountResponse,
  IamGetAccountsQuery,
} from '@app/iam/account';
import { IamGetAccountsService } from '@app/iam/account/application/get/iam-get-accounts.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamGetAccountsQuery)
export class IamGetAccountsQueryHandler
  implements IQueryHandler<IamGetAccountsQuery>
{
  private readonly mapper: IamAccountMapper = new IamAccountMapper();

  constructor(private readonly getAccountsService: IamGetAccountsService) {}

  async execute(
    query: IamGetAccountsQuery,
  ): Promise<IamAccountResponse[] | LiteralObject[]> {
    const models = await this.getAccountsService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    if (query.cQMetadata?.excludeMapModelToAggregate) return models;

    return this.mapper.mapAggregatesToResponses(models as IamAccount[]);
  }
}
