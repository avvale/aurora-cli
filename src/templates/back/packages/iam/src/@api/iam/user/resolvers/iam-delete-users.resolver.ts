import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeleteUsersHandler } from '../handlers/iam-delete-users.handler';
import { IamUser } from '@api/graphql';

@Resolver()
@Permissions('iam.user.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamDeleteUsersResolver
{
    constructor(
        private readonly handler: IamDeleteUsersHandler,
    ) {}

    @Mutation('iamDeleteUsers')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamUser[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}