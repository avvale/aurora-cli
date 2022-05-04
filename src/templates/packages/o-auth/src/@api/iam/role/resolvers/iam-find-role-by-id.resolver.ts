import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamFindRoleByIdHandler } from '../handlers/iam-find-role-by-id.handler';
import { IamRole } from '../../../../graphql';

@Resolver()
export class IamFindRoleByIdResolver
{
    constructor(
        private readonly handler: IamFindRoleByIdHandler,
    ) {}

    @Query('iamFindRoleById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamRole>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}