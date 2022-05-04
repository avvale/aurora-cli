import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamFindRoleHandler } from '../handlers/iam-find-role.handler';
import { IamRole } from '../../../../graphql';

@Resolver()
export class IamFindRoleResolver
{
    constructor(
        private readonly handler: IamFindRoleHandler,
    ) {}

    @Query('iamFindRole')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamRole>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}