import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamPaginateUsersHandler } from '../handlers/iam-paginate-users.handler';
import { Pagination } from '../../../../graphql';

@Resolver()
@Permissions('iam.user.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamPaginateUsersResolver
{
    constructor(
        private readonly handler: IamPaginateUsersHandler,
    ) {}

    @Query('iamPaginateUsers')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
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