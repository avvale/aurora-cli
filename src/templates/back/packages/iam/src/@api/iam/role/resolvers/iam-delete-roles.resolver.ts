import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeleteRolesHandler } from '../handlers/iam-delete-roles.handler';
import { IamRole } from '@api/graphql';

@Resolver()
@Permissions('iam.role.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamDeleteRolesResolver
{
    constructor(
        private readonly handler: IamDeleteRolesHandler,
    ) {}

    @Mutation('iamDeleteRoles')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamRole[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}