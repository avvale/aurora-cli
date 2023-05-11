import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamGetPermissionsHandler } from '../handlers/iam-get-permissions.handler';
import { IamPermission } from '@api/graphql';

@Resolver()
@Auth('iam.permission.get')
export class IamGetPermissionsResolver
{
    constructor(
        private readonly handler: IamGetPermissionsHandler,
    ) {}

    @Query('iamGetPermissions')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermission[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}