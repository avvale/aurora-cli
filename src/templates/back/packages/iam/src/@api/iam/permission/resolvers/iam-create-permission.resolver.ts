import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamCreatePermissionHandler } from '../handlers/iam-create-permission.handler';
import { IamPermission, IamCreatePermissionInput } from '@api/graphql';

@Resolver()
@Permissions('iam.permission.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamCreatePermissionResolver
{
    constructor(
        private readonly handler: IamCreatePermissionHandler,
    ) {}

    @Mutation('iamCreatePermission')
    async main(
        @Args('payload') payload: IamCreatePermissionInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamPermission>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}