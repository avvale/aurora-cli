import { IamPermission, IamUpdatePermissionByIdInput } from '@api/graphql';
import { IamUpdatePermissionByIdHandler } from '@api/iam/permission';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.permission.update')
export class IamUpdatePermissionByIdResolver {
    constructor(private readonly handler: IamUpdatePermissionByIdHandler) {}

    @Mutation('iamUpdatePermissionById')
    async main(
        @Args('payload') payload: IamUpdatePermissionByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamPermission> {
        return await this.handler.main(payload, constraint, timezone, auditing);
    }
}
