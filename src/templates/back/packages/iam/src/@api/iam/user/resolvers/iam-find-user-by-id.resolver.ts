import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamFindUserByIdHandler } from '../handlers/iam-find-user-by-id.handler';
import { IamUser } from '@api/graphql';

@Resolver()
@Permissions('iam.user.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamFindUserByIdResolver
{
    constructor(
        private readonly handler: IamFindUserByIdHandler,
    ) {}

    @Query('iamFindUserById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamUser>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}