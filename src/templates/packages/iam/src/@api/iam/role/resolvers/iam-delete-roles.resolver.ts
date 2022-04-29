import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamDeleteRolesHandler } from '../handlers/iam-delete-roles.handler';
import { IamRole } from '../../../../graphql';

@Resolver()
export class IamDeleteRolesResolver
{
    constructor(
        private readonly handler: IamDeleteRolesHandler,
    ) {}

    @Mutation('iamDeleteRoles')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamRole[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}