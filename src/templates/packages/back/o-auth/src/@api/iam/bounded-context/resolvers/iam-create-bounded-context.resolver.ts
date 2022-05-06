import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamCreateBoundedContextHandler } from '../handlers/iam-create-bounded-context.handler';
import { IamBoundedContext, IamCreateBoundedContextInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.boundedContext.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreateBoundedContextResolver
{
    constructor(
        private readonly handler: IamCreateBoundedContextHandler,
    ) {}

    @Mutation('iamCreateBoundedContext')
    async main(
        @Args('payload') payload: IamCreateBoundedContextInput,
        @Timezone() timezone?: string,
    ): Promise<IamBoundedContext>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}