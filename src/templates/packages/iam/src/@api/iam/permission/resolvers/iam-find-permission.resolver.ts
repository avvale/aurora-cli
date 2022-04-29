import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamFindPermissionHandler } from '../handlers/iam-find-permission.handler';
import { IamPermission } from '../../../../graphql';

@Resolver()
export class IamFindPermissionResolver
{
    constructor(
        private readonly handler: IamFindPermissionHandler,
    ) {}

    @Query('iamFindPermission')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermission>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}