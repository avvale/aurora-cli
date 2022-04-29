import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamUpdatePermissionHandler } from '../handlers/iam-update-permission.handler';
import { IamPermission, IamUpdatePermissionInput } from '../../../../graphql';

@Resolver()
export class IamUpdatePermissionResolver
{
    constructor(
        private readonly handler: IamUpdatePermissionHandler,
    ) {}

    @Mutation('iamUpdatePermission')
    async main(
        @Args('payload') payload: IamUpdatePermissionInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermission>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}