import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamCreateRoleHandler } from '../handlers/iam-create-role.handler';
import { IamRole, IamCreateRoleInput } from '@api/graphql';

@Resolver()
@Permissions('iam.role.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamCreateRoleResolver
{
    constructor(
        private readonly handler: IamCreateRoleHandler,
    ) {}

    @Mutation('iamCreateRole')
    async main(
        @Args('payload') payload: IamCreateRoleInput,
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