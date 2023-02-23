import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpsertUserHandler } from '../handlers/iam-upsert-user.handler';
import { IamUser, IamUpdateUserByIdInput } from '@api/graphql';

@Resolver()
@Permissions('iam.user.upsert')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpsertUserResolver
{
    constructor(
        private readonly handler: IamUpsertUserHandler,
    ) {}

    @Mutation('iamUpsertUser')
    async main(
        @Args('payload') payload: IamUpdateUserByIdInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamUser>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}