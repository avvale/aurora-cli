import { IamUser } from '@api/graphql';
import { IamFindUserHandler } from '@api/iam/user';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

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
