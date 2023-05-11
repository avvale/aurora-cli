import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamGetPermissionsRolesHandler } from '../handlers/iam-get-permissions-roles.handler';
import { IamPermissionRole } from '@api/graphql';

@Resolver()
@Auth('iam.role.get')
export class IamGetPermissionsRolesResolver
{
    constructor(
        private readonly handler: IamGetPermissionsRolesHandler,
    ) {}

    @Query('iamGetPermissionsRoles')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermissionRole[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}