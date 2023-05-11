import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdateAccountByIdHandler } from '../handlers/iam-update-account-by-id.handler';
import { IamAccount, IamUpdateAccountByIdInput } from '@api/graphql';

@Resolver()
@Auth('iam.account.update')
export class IamUpdateAccountByIdResolver
{
    constructor(
        private readonly handler: IamUpdateAccountByIdHandler,
    ) {}

    @Mutation('iamUpdateAccountById')
    async main(
        @Args('payload') payload: IamUpdateAccountByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}