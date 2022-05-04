import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamUpdateRoleHandler } from '../handlers/iam-update-role.handler';
import { IamRole, IamUpdateRoleInput } from '../../../../graphql';

@Resolver()
export class IamUpdateRoleResolver
{
    constructor(
        private readonly handler: IamUpdateRoleHandler,
    ) {}

    @Mutation('iamUpdateRole')
    async main(
        @Args('payload') payload: IamUpdateRoleInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamRole>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}