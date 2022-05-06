import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamCreateAccountHandler } from '../handlers/iam-create-account.handler';
import { IamAccount, IamCreateAccountInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.account.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreateAccountResolver
{
    constructor(
        private readonly handler: IamCreateAccountHandler,
    ) {}

    @Mutation('iamCreateAccount')
    async main(
        @Args('payload') payload: IamCreateAccountInput,
        @Context() context,
        @Timezone() timezone?: string,
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            payload,
            context.req.headers,
            timezone,
        );
    }
}