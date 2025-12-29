import { IamAccount, IamCreateAccountInput } from '@api/graphql';
import { IamCreateAccountHandler } from '@api/iam/account';
import { IamAccountResponse } from '@app/iam/account';
import { Auth, GqlHeaders } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    CurrentAccount,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.account.create')
export class IamCreateAccountResolver {
    constructor(private readonly handler: IamCreateAccountHandler) {}

    @Mutation('iamCreateAccount')
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @GqlHeaders() headers: any,
        @Args('payload') payload: IamCreateAccountInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamAccount> {
        return await this.handler.main(
            account,
            headers,
            payload,
            timezone,
            auditing,
        );
    }
}
