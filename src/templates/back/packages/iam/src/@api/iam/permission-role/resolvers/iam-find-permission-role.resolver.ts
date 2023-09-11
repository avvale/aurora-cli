import { IamPermissionRole } from '@api/graphql';
import { IamFindPermissionRoleHandler } from '@api/iam/permission-role';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.permissionRole.get')
export class IamFindPermissionRoleResolver
{
    constructor(
        private readonly handler: IamFindPermissionRoleHandler,
    ) {}

    @Query('iamFindPermissionRole')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermissionRole>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
