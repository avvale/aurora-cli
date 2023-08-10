import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CurrentAccount, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdateUserMetaByIdHandler } from '../handlers/iam-update-user-meta-by-id.handler';
import { IamUserMeta, IamUpdateUserMetaByIdInput } from '@api/graphql';
import { IamAccountResponse } from '@app/iam/account/domain/iam-account.response';

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
        @CurrentAccount() account: IamAccountResponse,
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