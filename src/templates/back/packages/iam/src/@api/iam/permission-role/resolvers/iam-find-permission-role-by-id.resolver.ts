import { IamPermissionRole } from '@api/graphql';
import { IamFindPermissionRoleByIdHandler } from '@api/iam/permission-role';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.permissionRole.get')
export class IamFindPermissionRoleByIdResolver {
    constructor(private readonly handler: IamFindPermissionRoleByIdHandler) {}

    @Query('iamFindPermissionRoleById')
    async main(
        @Args('permissionId') permissionId: string,
        @Args('roleId') roleId: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermissionRole> {
        return await this.handler.main(
            permissionId,
            roleId,
            constraint,
            timezone,
        );
    }
}
