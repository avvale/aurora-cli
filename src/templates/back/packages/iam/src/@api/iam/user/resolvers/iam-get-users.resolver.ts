import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamGetUsersHandler } from '../handlers/iam-get-users.handler';
import { IamUser } from '@api/graphql';

@Resolver()
@Permissions('iam.user.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamGetUsersResolver
{
    constructor(
        private readonly handler: IamGetUsersHandler,
    ) {}

    @Query('iamGetUsers')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamUser[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}