import { IamPermission } from '@api/graphql';
import { IamGetPermissionsHandler } from '@api/iam/permission';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.permission.get')
export class IamGetPermissionsResolver {
    constructor(private readonly handler: IamGetPermissionsHandler) {}

    @Query('iamGetPermissions')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermission[]> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
