import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamDeleteUserByIdHandler } from '../handlers/iam-delete-user-by-id.handler';
import { IamUser } from '../../../../graphql';

@Resolver()
export class IamDeleteUserByIdResolver
{
    constructor(
        private readonly handler: IamDeleteUserByIdHandler,
    ) {}

    @Mutation('iamDeleteUserById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamUser>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}