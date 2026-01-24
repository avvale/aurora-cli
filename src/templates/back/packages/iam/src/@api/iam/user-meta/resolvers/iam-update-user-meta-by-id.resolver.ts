import { Auth } from '@aurora/decorators';
import { CurrentAccount, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

// @app
import { IamUpdateUserMetaByIdInput, IamUserMeta } from '@api/graphql';
import { IamAccountResponse } from '@app/iam/account/domain/iam-account.response';
import { IamUpdateUserMetaByIdHandler } from '../handlers/iam-update-user-meta-by-id.handler';

@Resolver()
@Auth('iam.userData.update')
export class IamUpdateUserMetaByIdResolver {
  constructor(private readonly handler: IamUpdateUserMetaByIdHandler) {}

  @Mutation('iamUpdateUserMetaById')
  async main(
    @Args('payload') payload: IamUpdateUserMetaByIdInput,
    @CurrentAccount() account: IamAccountResponse,
    @Timezone() timezone?: string,
  ): Promise<IamUserMeta> {
    return await this.handler.main(payload, account, timezone);
  }
}
