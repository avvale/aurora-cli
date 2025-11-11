import { IamCheckUniqueUsernameAccountHandler } from '@api/iam/account';
import { Auth } from '@aurora/decorators';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth()
export class IamCheckUniqueUsernameAccountResolver {
    constructor(
        private readonly handler: IamCheckUniqueUsernameAccountHandler,
    ) {}

    @Query('iamCheckUniqueUsernameAccount')
    async main(
        @Args('username') username: string,
        @Args('avoidUsernames') avoidUsernames?: string[],
    ): Promise<boolean> {
        return await this.handler.main(username, avoidUsernames);
    }
}
