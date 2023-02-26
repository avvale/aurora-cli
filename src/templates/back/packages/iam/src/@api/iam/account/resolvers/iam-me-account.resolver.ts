import { Resolver, Query, Context } from '@nestjs/graphql';
import { Auth } from '@aurora/decorators';
import { IamAccount } from '@api/graphql';

// @app
import { IamMeAccountHandler } from '../handlers/iam-me-account.handler';
@Resolver()
@Auth()
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