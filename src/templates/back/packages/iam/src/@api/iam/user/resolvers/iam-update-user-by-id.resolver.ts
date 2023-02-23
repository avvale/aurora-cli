import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdateUserByIdHandler } from '../handlers/iam-update-user-by-id.handler';
import { IamUser, IamUpdateUserByIdInput } from '@api/graphql';

@Resolver()
@Permissions('iam.user.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpdateUserByIdResolver
{
    constructor(
        private readonly handler: IamUpdateUserByIdHandler,
    ) {}

    @Mutation('iamUpdateUserById')
    async main(
        @Args('payload') payload: IamUpdateUserByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamUser>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}