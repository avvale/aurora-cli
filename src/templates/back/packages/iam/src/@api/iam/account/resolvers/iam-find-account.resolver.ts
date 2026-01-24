import { IamAccount } from '@api/graphql';
import { IamFindAccountHandler } from '@api/iam/account';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.account.get')
export class IamFindAccountResolver {
  constructor(private readonly handler: IamFindAccountHandler) {}

  @Query('iamFindAccount')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<IamAccount> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
