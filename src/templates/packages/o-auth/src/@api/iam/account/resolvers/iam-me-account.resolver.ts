import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Context } from '@nestjs/graphql';
import { IamAccount } from '../../../../graphql';

// authorization
import { AuthenticationJwtGuard } from '../../../o-auth/shared/guards/authentication-jwt.guard';

// @apps
import { IamMeAccountHandler } from '../handlers/iam-me-account.handler';
@Resolver()
@UseGuards(AuthenticationJwtGuard)
export class IamMeAccountResolver
{
    constructor(
        private readonly handler: IamMeAccountHandler,
    ) {}

    @Query('iamMeAccount')
    async main(@Context() context): Promise<IamAccount>
    {
        return await this.handler.main(
            context.req.headers.authorization,
        );
    }
}