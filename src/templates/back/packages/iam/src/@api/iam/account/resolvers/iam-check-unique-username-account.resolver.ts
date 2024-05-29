import { IamCheckUniqueUsernameAccountHandler } from '@api/iam/account';
import { AuthenticationJwtGuard } from '@api/o-auth/shared';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@UseGuards(AuthenticationJwtGuard)
export class IamCheckUniqueUsernameAccountResolver
{
    constructor(
        private readonly handler: IamCheckUniqueUsernameAccountHandler,
    ) {}

    @Query('iamCheckUniqueUsernameAccount')
    async main(
        @Args('username') username: string,
        @Args('avoidUsernames') avoidUsernames?: string[],
    ): Promise<boolean>
    {
        return await this.handler.main(
            username,
            avoidUsernames,
        );
    }
}
