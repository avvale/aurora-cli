import { IamCreateRoleInput } from '@api/graphql';
import { IamCreateRolesHandler } from '@api/iam/role';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.role.create')
export class IamCreateRolesResolver {
    constructor(private readonly handler: IamCreateRolesHandler) {}

    @Mutation('iamCreateRoles')
    async main(
        @Args('payload') payload: IamCreateRoleInput[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean> {
        return await this.handler.main(payload, timezone, auditing);
    }
}
