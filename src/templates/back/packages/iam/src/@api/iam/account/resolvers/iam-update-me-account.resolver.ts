import { IamUpdateMeAccountInput } from '@api/graphql';
import { IamUpdateMeAccountHandler } from '@api/iam/account';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  CurrentAccount,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.accountSettings.update')
export class IamUpdateMeAccountResolver {
  constructor(private readonly handler: IamUpdateMeAccountHandler) {}

  @Mutation('iamUpdateMeAccount')
  async main(
    @CurrentAccount() account: IamAccountResponse,
    @Args('payload') payload: IamUpdateMeAccountInput,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<boolean> {
    return await this.handler.main(account, payload, timezone, auditing);
  }
}
