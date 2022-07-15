import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CurrentAccount, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateUserDataByIdHandler } from '../handlers/iam-update-user-data-by-id.handler';
import { IamUserData, IamUpdateUserByIdInput } from '../../../../graphql';
import { AccountResponse } from '@apps/iam/account/domain/account.response';

@Resolver()
@Permissions('iam.user-data.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateUserDataByIdResolver
{
    constructor(
        private readonly handler: IamUpdateUserDataByIdHandler,
    ) {}

    @Mutation('iamUpdateUserDataById')
    async main(
        @Args('payload') payload: IamUpdateUserByIdInput,
        @CurrentAccount() account: AccountResponse,
        @Timezone() timezone?: string,
    ): Promise<IamUserData>
    {
        return await this.handler.main(
            payload,
            account,
            timezone,
        );
    }
}