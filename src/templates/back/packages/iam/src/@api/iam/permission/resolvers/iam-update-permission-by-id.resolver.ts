import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdatePermissionByIdHandler } from '../handlers/iam-update-permission-by-id.handler';
import { IamPermission, IamUpdatePermissionByIdInput } from '@api/graphql';

@Resolver()
@Permissions('iam.permission.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpdatePermissionByIdResolver
{
    constructor(
        private readonly handler: IamUpdatePermissionByIdHandler,
    ) {}

    @Mutation('iamUpdatePermissionById')
    async main(
        @Args('payload') payload: IamUpdatePermissionByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamPermission>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}