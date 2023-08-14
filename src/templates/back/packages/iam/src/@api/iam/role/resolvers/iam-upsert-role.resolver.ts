import { IamRole, IamUpdateRoleByIdInput } from '@api/graphql';
import { IamUpsertRoleHandler } from '@api/iam/role';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.role.upsert')
export class IamUpsertRoleResolver
{
    constructor(
        private readonly handler: IamUpsertRoleHandler,
    ) {}

    @Mutation('iamUpsertRole')
    async main(
        @Args('payload') payload: IamUpdateRoleByIdInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamRole>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
