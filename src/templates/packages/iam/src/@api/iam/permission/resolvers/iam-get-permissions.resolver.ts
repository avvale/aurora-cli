import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamGetPermissionsHandler } from '../handlers/iam-get-permissions.handler';
import { IamPermission } from '../../../../graphql';

@Resolver()
export class IamGetPermissionsResolver
{
    constructor(
        private readonly handler: IamGetPermissionsHandler,
    ) {}

    @Query('iamGetPermissions')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermission[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}