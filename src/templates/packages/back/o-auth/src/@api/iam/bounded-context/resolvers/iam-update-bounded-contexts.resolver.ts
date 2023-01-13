import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { IamUpdateBoundedContextsHandler } from '../handlers/iam-update-bounded-contexts.handler';
import { IamBoundedContext, IamUpdateBoundedContextsInput } from '@api/graphql';

@Resolver()
@Permissions('iam.boundedContext.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateBoundedContextsResolver
{
    constructor(
        private readonly handler: IamUpdateBoundedContextsHandler,
    ) {}

    @Mutation('iamUpdateBoundedContexts')
    async main(
        @Args('payload') payload: IamUpdateBoundedContextsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamBoundedContext>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}