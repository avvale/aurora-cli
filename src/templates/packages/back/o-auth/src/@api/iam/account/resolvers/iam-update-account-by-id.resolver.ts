import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateAccountByIdHandler } from '../handlers/iam-update-account-by-id.handler';
import { IamAccount, IamUpdateAccountByIdInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.account.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateAccountByIdResolver
{
    constructor(
        private readonly handler: IamUpdateAccountByIdHandler,
    ) {}

    @Mutation('iamUpdateAccountById')
    async main(
        @Args('payload') payload: IamUpdateAccountByIdInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}