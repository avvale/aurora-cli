import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindAccountHandler } from '../handlers/iam-find-account.handler';
import { IamAccount } from '@api/graphql';

@Resolver()
@Auth('iam.account.get')
export class IamFindAccountResolver
{
    constructor(
        private readonly handler: IamFindAccountHandler,
    ) {}

    @Query('iamFindAccount')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}