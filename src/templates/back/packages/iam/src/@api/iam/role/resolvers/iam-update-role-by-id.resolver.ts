import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdateRoleByIdHandler } from '../handlers/iam-update-role-by-id.handler';
import { IamRole, IamUpdateRoleByIdInput } from '@api/graphql';

@Resolver()
@Permissions('iam.role.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpdateRoleByIdResolver
{
    constructor(
        private readonly handler: IamUpdateRoleByIdHandler,
    ) {}

    @Mutation('iamUpdateRoleById')
    async main(
        @Args('payload') payload: IamUpdateRoleByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamRole>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}