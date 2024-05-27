import { IamUpdateMeAccountInput } from '@api/graphql';
import { IamMeAccountUpdateHandler } from '@api/iam/account';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, CurrentAccount, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.account.update')
export class IamMeAccountUpdateResolver
{
    constructor(
        private readonly handler: IamMeAccountUpdateHandler,
    ) {}

    @Mutation('iamMeAccountUpdate')
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Args('payload') payload: IamUpdateMeAccountInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            account,
            payload,
            timezone,
            auditing,
        );
    }
}
