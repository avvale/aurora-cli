import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamGetUsersHandler } from '../handlers/iam-get-users.handler';
import { IamUser } from '../../../../graphql';

@Resolver()
export class IamGetUsersResolver
{
    constructor(
        private readonly handler: IamGetUsersHandler,
    ) {}

    @Query('iamGetUsers')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
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