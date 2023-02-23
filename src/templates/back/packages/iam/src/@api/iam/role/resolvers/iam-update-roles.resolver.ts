import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdateRolesHandler } from '../handlers/iam-update-roles.handler';
import { IamRole, IamUpdateRolesInput } from '@api/graphql';

@Resolver()
@Permissions('iam.role.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpdateRolesResolver
{
    constructor(
        private readonly handler: IamUpdateRolesHandler,
    ) {}

    @Mutation('iamUpdateRoles')
    async main(
        @Args('payload') payload: IamUpdateRolesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamRole>
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