import { IamAccount } from '@api/graphql';
import { IamDeleteAccountByIdHandler } from '@api/iam/account';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.account.delete')
export class IamDeleteAccountByIdResolver {
    constructor(private readonly handler: IamDeleteAccountByIdHandler) {}

    @Mutation('iamDeleteAccountById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamAccount> {
        return await this.handler.main(id, constraint, timezone, auditing);
    }
}
