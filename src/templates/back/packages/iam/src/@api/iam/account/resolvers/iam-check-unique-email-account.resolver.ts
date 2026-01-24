import { IamCheckUniqueEmailAccountHandler } from '@api/iam/account';
import { Auth } from '@aurora/decorators';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.account.get', 'iam.accountSettings.update')
export class IamCheckUniqueEmailAccountResolver {
  constructor(private readonly handler: IamCheckUniqueEmailAccountHandler) {}

  @Query('iamCheckUniqueEmailAccount')
  async main(
    @Args('email') email?: string,
    @Args('avoidEmails') avoidEmails?: string[],
  ): Promise<boolean> {
    return await this.handler.main(email, avoidEmails);
  }
}
