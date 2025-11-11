import { IamCheckPasswordMeAccountHandler } from '@api/iam/account';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { CurrentAccount } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth()
export class IamCheckPasswordMeAccountResolver {
    constructor(private readonly handler: IamCheckPasswordMeAccountHandler) {}

    @Query('iamCheckPasswordMeAccount')
    async main(
        @CurrentAccount() account: IamAccountResponse,
        @Args('password') password: string,
    ): Promise<boolean> {
        return await this.handler.main(account, password);
    }
}
