import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamDeleteUsersHandler } from '../handlers/iam-delete-users.handler';
import { IamUser } from '../../../../graphql';

@Resolver()
export class IamDeleteUsersResolver
{
    constructor(
        private readonly handler: IamDeleteUsersHandler,
    ) {}

    @Mutation('iamDeleteUsers')
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