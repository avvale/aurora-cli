import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamDeleteRoleByIdHandler } from '../handlers/iam-delete-role-by-id.handler';
import { IamRole } from '../../../../graphql';

@Resolver()
export class IamDeleteRoleByIdResolver
{
    constructor(
        private readonly handler: IamDeleteRoleByIdHandler,
    ) {}

    @Mutation('iamDeleteRoleById')
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