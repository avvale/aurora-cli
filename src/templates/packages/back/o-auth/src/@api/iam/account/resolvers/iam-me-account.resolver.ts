import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Context } from '@nestjs/graphql';
import { IamAccount } from '../../../../../@api/graphql';

// authorization
import { AuthenticationJwtGuard } from '../../../o-auth/shared/guards/authentication-jwt.guard';

// @app
import { IamMeAccountHandler } from '../handlers/iam-me-account.handler';
@Resolver()
@UseGuards(AuthenticationGuard)
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