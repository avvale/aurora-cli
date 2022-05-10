import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateBoundedContextByIdHandler } from '../handlers/iam-update-bounded-context-by-id.handler';
import { IamBoundedContext, IamUpdateBoundedContextByIdInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.boundedContext.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateBoundedContextByIdResolver
{
    constructor(
        private readonly handler: IamUpdateBoundedContextByIdHandler,
    ) {}

    @Mutation('iamUpdateBoundedContextById')
    async main(
        @Args('payload') payload: IamUpdateBoundedContextByIdInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamBoundedContext>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}