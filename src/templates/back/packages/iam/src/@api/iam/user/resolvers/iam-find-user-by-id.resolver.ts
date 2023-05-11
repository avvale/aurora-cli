import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindUserByIdHandler } from '../handlers/iam-find-user-by-id.handler';
import { IamUser } from '@api/graphql';

@Resolver()
@Auth('iam.user.get')
export class IamFindUserByIdResolver
{
    constructor(
        private readonly handler: IamFindUserByIdHandler,
    ) {}

    @Query('iamFindUserById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
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