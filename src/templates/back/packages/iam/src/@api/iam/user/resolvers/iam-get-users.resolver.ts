import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamGetUsersHandler } from '../handlers/iam-get-users.handler';
import { IamUser } from '@api/graphql';

@Resolver()
@Auth('iam.user.get')
export class IamGetUsersResolver
{
    constructor(
        private readonly handler: IamGetUsersHandler,
    ) {}

    @Query('iamGetUsers')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamUser[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}