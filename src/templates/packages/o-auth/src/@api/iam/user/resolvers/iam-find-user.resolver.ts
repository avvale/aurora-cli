import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamFindUserHandler } from '../handlers/iam-find-user.handler';
import { IamUser } from '../../../../graphql';

@Resolver()
export class IamFindUserResolver
{
    constructor(
        private readonly handler: IamFindUserHandler,
    ) {}

    @Query('iamFindUser')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamUser>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}