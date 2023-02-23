import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeletePermissionsHandler } from '../handlers/iam-delete-permissions.handler';
import { IamPermission } from '@api/graphql';

@Resolver()
@Permissions('iam.permission.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamDeletePermissionsResolver
{
    constructor(
        private readonly handler: IamDeletePermissionsHandler,
    ) {}

    @Mutation('iamDeletePermissions')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamPermission[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}