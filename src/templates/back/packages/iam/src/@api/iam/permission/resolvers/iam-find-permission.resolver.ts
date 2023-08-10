import { IamPermission } from '@api/graphql';
import { IamFindPermissionHandler } from '@api/iam/permission';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

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
