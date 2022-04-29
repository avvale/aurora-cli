import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamDeletePermissionsHandler } from '../handlers/iam-delete-permissions.handler';
import { IamPermission } from '../../../../graphql';

@Resolver()
export class IamDeletePermissionsResolver
{
    constructor(
        private readonly handler: IamDeletePermissionsHandler,
    ) {}

    @Mutation('iamDeletePermissions')
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