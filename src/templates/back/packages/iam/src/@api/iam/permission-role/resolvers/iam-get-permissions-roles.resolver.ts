import { IamPermissionRole } from '@api/graphql';
import { IamGetPermissionsRolesHandler } from '@api/iam/permission-role';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.permissionRole.get')
export class IamGetPermissionsRolesResolver {
    constructor(private readonly handler: IamGetPermissionsRolesHandler) {}

    @Query('iamGetPermissionsRoles')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermissionRole[]> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
