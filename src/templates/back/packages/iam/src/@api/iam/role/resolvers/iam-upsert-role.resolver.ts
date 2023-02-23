import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpsertRoleHandler } from '../handlers/iam-upsert-role.handler';
import { IamRole, IamUpdateRoleByIdInput } from '@api/graphql';

@Resolver()
@Permissions('iam.role.upsert')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpsertRoleResolver
{
    constructor(
        private readonly handler: IamUpsertRoleHandler,
    ) {}

    @Mutation('iamUpsertRole')
    async main(
        @Args('payload') payload: IamUpdateRoleByIdInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamRole>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}