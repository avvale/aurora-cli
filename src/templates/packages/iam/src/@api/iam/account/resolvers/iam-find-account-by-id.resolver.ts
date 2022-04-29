import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamFindAccountByIdHandler } from '../handlers/iam-find-account-by-id.handler';
import { IamAccount } from '../../../../graphql';

@Resolver()
export class IamFindAccountByIdResolver
{
    constructor(
        private readonly handler: IamFindAccountByIdHandler,
    ) {}

    @Query('iamFindAccountById')
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