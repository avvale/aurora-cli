import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamGetRolesHandler } from '../handlers/iam-get-roles.handler';
import { IamRole } from '../../../../graphql';

@Resolver()
export class IamGetRolesResolver
{
    constructor(
        private readonly handler: IamGetRolesHandler,
    ) {}

    @Query('iamGetRoles')
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