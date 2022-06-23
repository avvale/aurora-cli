import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamPaginateBoundedContextsHandler } from '../handlers/iam-paginate-bounded-contexts.handler';
import { Pagination } from '../../../../graphql';

@Resolver()
@Permissions('iam.boundedContext.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamPaginateBoundedContextsResolver
{
    constructor(
        private readonly handler: IamPaginateBoundedContextsHandler,
    ) {}

    @Query('iamPaginateBoundedContexts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}