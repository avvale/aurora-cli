import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamFindBoundedContextByIdHandler } from '../handlers/iam-find-bounded-context-by-id.handler';
import { IamBoundedContext } from '@api/graphql';

@Resolver()
@Permissions('iam.boundedContext.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamFindBoundedContextByIdResolver
{
    constructor(
        private readonly handler: IamFindBoundedContextByIdHandler,
    ) {}

    @Query('iamFindBoundedContextById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamBoundedContext>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}