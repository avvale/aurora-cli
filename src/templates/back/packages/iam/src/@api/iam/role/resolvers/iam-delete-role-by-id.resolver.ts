import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeleteRoleByIdHandler } from '../handlers/iam-delete-role-by-id.handler';
import { IamRole } from '@api/graphql';

@Resolver()
@Permissions('iam.role.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamDeleteRoleByIdResolver
{
    constructor(
        private readonly handler: IamDeleteRoleByIdHandler,
    ) {}

    @Mutation('iamDeleteRoleById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamRole>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}