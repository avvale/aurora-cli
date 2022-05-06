import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamFindBoundedContextHandler } from '../handlers/iam-find-bounded-context.handler';
import { IamBoundedContext } from '../../../../graphql';

@Resolver()
@Permissions('iam.boundedContext.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamFindBoundedContextResolver
{
    constructor(
        private readonly handler: IamFindBoundedContextHandler,
    ) {}

    @Query('iamFindBoundedContext')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamBoundedContext>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}