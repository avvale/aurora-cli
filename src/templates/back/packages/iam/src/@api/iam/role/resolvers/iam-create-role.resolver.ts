import { IamCreateRoleInput, IamRole } from '@api/graphql';
import { IamCreateRoleHandler } from '@api/iam/role';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.role.create')
export class IamCreateRoleResolver {
    constructor(private readonly handler: IamCreateRoleHandler) {}

    @Mutation('iamCreateRole')
    async main(
        @Args('payload') payload: IamCreateRoleInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamRole> {
        return await this.handler.main(payload, timezone, auditing);
    }
}
