import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdatePermissionsHandler } from '../handlers/iam-update-permissions.handler';
import { IamPermission, IamUpdatePermissionsInput } from '@api/graphql';

@Resolver()
@Permissions('iam.permission.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpdatePermissionsResolver
{
    constructor(
        private readonly handler: IamUpdatePermissionsHandler,
    ) {}

    @Mutation('iamUpdatePermissions')
    async main(
        @Args('payload') payload: IamUpdatePermissionsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamPermission>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}