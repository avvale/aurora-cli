import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamCreateAccountHandler } from '../handlers/iam-create-account.handler';
import { IamAccount, IamCreateAccountInput } from '@api/graphql';

@Resolver()
@Auth('iam.account.create')
export class IamCreateAccountResolver
{
    constructor(
        private readonly handler: IamCreateAccountHandler,
    ) {}

    @Mutation('iamCreateAccount')
    async main(
        @Args('payload') payload: IamCreateAccountInput,
        @Context() context,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            payload,
            context.req.headers,
            timezone,
            auditing,
        );
    }
}