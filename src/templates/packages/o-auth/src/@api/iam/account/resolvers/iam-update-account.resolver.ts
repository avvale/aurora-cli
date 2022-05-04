import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '../../../../@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateAccountHandler } from '../handlers/iam-update-account.handler';
import { IamAccount, IamUpdateAccountInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.account.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateAccountResolver
{
    constructor(
        private readonly handler: IamUpdateAccountHandler,
    ) {}

    @Mutation('iamUpdateAccount')
    async main(
        @Args('payload') payload: IamUpdateAccountInput,
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