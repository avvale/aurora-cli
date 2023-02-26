import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindAccountByIdHandler } from '../handlers/iam-find-account-by-id.handler';
import { IamAccount } from '@api/graphql';

@Resolver()
@Auth('iam.account.get')
export class IamFindAccountByIdResolver
{
    constructor(
        private readonly handler: IamFindAccountByIdHandler,
    ) {}

    @Query('iamFindAccountById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
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