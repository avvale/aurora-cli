import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeleteAccountByIdHandler } from '../handlers/iam-delete-account-by-id.handler';
import { IamAccount } from '@api/graphql';

@Resolver()
@Auth('iam.account.delete')
export class IamDeleteAccountByIdResolver
{
    constructor(
        private readonly handler: IamDeleteAccountByIdHandler,
    ) {}

    @Mutation('iamDeleteAccountById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}