import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamFindAccountHandler } from '../handlers/iam-find-account.handler';
import { IamAccount } from '../../../../graphql';

@Resolver()
export class IamFindAccountResolver
{
    constructor(
        private readonly handler: IamFindAccountHandler,
    ) {}

    @Query('iamFindAccount')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}