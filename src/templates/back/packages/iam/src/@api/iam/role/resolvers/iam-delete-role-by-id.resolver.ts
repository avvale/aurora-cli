import { IamRole } from '@api/graphql';
import { IamDeleteRoleByIdHandler } from '@api/iam/role';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.role.delete')
export class IamDeleteRoleByIdResolver {
    constructor(private readonly handler: IamDeleteRoleByIdHandler) {}

    @Mutation('iamDeleteRoleById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamRole> {
        return await this.handler.main(id, constraint, timezone, auditing);
    }
}
