import { IamAccount } from '@api/graphql';
import { IamFindAccountByIdHandler } from '@api/iam/account';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.account.get')
export class IamFindAccountByIdResolver {
  constructor(private readonly handler: IamFindAccountByIdHandler) {}

  @Query('iamFindAccountById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<IamAccount> {
    return await this.handler.main(id, constraint, timezone);
  }
}
