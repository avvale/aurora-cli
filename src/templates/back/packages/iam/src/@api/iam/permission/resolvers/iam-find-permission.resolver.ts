import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindPermissionHandler } from '../handlers/iam-find-permission.handler';
import { IamPermission } from '@api/graphql';

@Resolver()
@Auth('iam.permission.get')
export class IamFindPermissionResolver
{
    constructor(
        private readonly handler: IamFindPermissionHandler,
    ) {}

    @Query('iamFindPermission')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermission>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}