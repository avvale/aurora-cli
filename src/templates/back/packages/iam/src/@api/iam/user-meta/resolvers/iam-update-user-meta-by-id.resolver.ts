import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CurrentAccount, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdateUserMetaByIdHandler } from '../handlers/iam-update-user-meta-by-id.handler';
import { IamUserMeta, IamUpdateUserMetaByIdInput } from '@api/graphql';
import { AccountResponse } from '@app/iam/account/domain/account.response';

@Resolver()
@Auth('iam.userData.update')
export class IamUpdateUserMetaByIdResolver
{
    constructor(
        private readonly handler: IamUpdateUserMetaByIdHandler,
    ) {}

    @Mutation('iamUpdateUserMetaById')
    async main(
        @Args('payload') payload: IamUpdateUserMetaByIdInput,
        @CurrentAccount() account: AccountResponse,
        @Timezone() timezone?: string,
    ): Promise<IamUserMeta>
    {
        return await this.handler.main(
            payload,
            account,
            timezone,
        );
    }
}