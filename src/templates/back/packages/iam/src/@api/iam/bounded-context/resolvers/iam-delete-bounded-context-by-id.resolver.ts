import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeleteBoundedContextByIdHandler } from '../handlers/iam-delete-bounded-context-by-id.handler';
import { IamBoundedContext } from '@api/graphql';

@Resolver()
@Permissions('iam.boundedContext.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamDeleteBoundedContextByIdResolver
{
    constructor(
        private readonly handler: IamDeleteBoundedContextByIdHandler,
    ) {}

    @Mutation('iamDeleteBoundedContextById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamBoundedContext>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}