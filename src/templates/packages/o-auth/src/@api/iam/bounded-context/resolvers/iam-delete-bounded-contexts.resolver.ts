import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '../../../../@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@api/iam/shared/guards/authorization.guard';

// @apps
import { IamDeleteBoundedContextsHandler } from '../handlers/iam-delete-bounded-contexts.handler';
import { IamBoundedContext } from '../../../../../graphql';

@Resolver()
@Permissions('iam.boundedContext.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamDeleteBoundedContextsResolver
{
    constructor(
        private readonly handler: IamDeleteBoundedContextsHandler,
    ) {}

    @Mutation('iamDeleteBoundedContexts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamBoundedContext[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}