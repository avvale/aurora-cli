import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeleteUserByIdHandler } from '../handlers/iam-delete-user-by-id.handler';
import { IamUser } from '@api/graphql';

@Resolver()
@Permissions('iam.user.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamDeleteUserByIdResolver
{
    constructor(
        private readonly handler: IamDeleteUserByIdHandler,
    ) {}

    @Mutation('iamDeleteUserById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamUser>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}