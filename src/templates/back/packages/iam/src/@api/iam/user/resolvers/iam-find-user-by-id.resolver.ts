import { IamUser } from '@api/graphql';
import { IamFindUserByIdHandler } from '@api/iam/user';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

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
