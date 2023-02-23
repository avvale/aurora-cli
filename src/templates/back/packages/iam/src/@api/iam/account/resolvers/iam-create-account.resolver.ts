import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamCreateAccountHandler } from '../handlers/iam-create-account.handler';
import { IamAccount, IamCreateAccountInput } from '@api/graphql';

@Resolver()
@Permissions('iam.account.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            payload,
            context.req.headers,
            timezone,
            auditing,
        );
    }
}