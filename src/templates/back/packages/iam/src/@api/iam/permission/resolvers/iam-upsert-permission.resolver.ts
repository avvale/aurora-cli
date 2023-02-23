import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpsertPermissionHandler } from '../handlers/iam-upsert-permission.handler';
import { IamPermission, IamUpdatePermissionByIdInput } from '@api/graphql';

@Resolver()
@Permissions('iam.permission.upsert')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpsertPermissionResolver
{
    constructor(
        private readonly handler: IamUpsertPermissionHandler,
    ) {}

    @Mutation('iamUpsertPermission')
    async main(
        @Args('payload') payload: IamUpdatePermissionByIdInput,
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