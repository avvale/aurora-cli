import { IamTenantAccount } from '@api/graphql';
import { IamDeleteTenantAccountByIdHandler } from '@api/iam/tenant-account';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tenantAccount.delete')
export class IamDeleteTenantAccountByIdResolver {
    constructor(private readonly handler: IamDeleteTenantAccountByIdHandler) {}

    @Mutation('iamDeleteTenantAccountById')
    async main(
        @Args('tenantId') tenantId: string,
        @Args('accountId') accountId: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamTenantAccount> {
        return await this.handler.main(
            tenantId,
            accountId,
            constraint,
            timezone,
            auditing,
        );
    }
}
