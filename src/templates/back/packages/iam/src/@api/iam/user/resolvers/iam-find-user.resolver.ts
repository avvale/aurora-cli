import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindUserHandler } from '../handlers/iam-find-user.handler';
import { IamUser } from '@api/graphql';

@Resolver()
@Auth('iam.user.get')
export class IamFindUserResolver
{
    constructor(
        private readonly handler: IamFindUserHandler,
    ) {}

    @Query('iamFindUser')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamUser>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}