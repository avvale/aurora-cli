import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeletePermissionByIdHandler } from '../handlers/iam-delete-permission-by-id.handler';
import { IamPermission } from '@api/graphql';

@Resolver()
@Permissions('iam.permission.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamDeletePermissionByIdResolver
{
    constructor(
        private readonly handler: IamDeletePermissionByIdHandler,
    ) {}

    @Mutation('iamDeletePermissionById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamPermission>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}