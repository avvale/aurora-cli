import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeletePermissionRoleByIdHandler } from '../handlers/iam-delete-permission-role-by-id.handler';
import { IamDeletePermissionRoleInput, IamPermissionRole } from '@api/graphql';

@Resolver()
@Permissions('iam.role.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamDeletePermissionRoleByIdResolver
{
    constructor(
        private readonly handler: IamDeletePermissionRoleByIdHandler,
    ) {}

    @Mutation('iamDeletePermissionRoleById')
    async main(
        @Args('payload') payload: IamDeletePermissionRoleInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamPermissionRole>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}