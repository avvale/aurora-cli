import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamDeleteAccountByIdHandler } from '../handlers/iam-delete-account-by-id.handler';
import { IamAccount } from '../../../../graphql';

@Resolver()
export class IamDeleteAccountByIdResolver
{
    constructor(
        private readonly handler: IamDeleteAccountByIdHandler,
    ) {}

    @Mutation('iamDeleteAccountById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}