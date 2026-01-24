import { Pagination } from '@api/graphql';
import { IamPaginateAccountsHandler } from '@api/iam/account';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.account.get')
export class IamPaginateAccountsResolver {
  constructor(private readonly handler: IamPaginateAccountsHandler) {}

  @Query('iamPaginateAccounts')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<Pagination> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
