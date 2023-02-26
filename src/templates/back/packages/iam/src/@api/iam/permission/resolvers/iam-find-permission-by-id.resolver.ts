import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindPermissionByIdHandler } from '../handlers/iam-find-permission-by-id.handler';
import { IamPermission } from '@api/graphql';

@Resolver()
@Auth('iam.permission.get')
export class IamFindPermissionByIdResolver
{
    constructor(
        private readonly handler: IamFindPermissionByIdHandler,
    ) {}

    @Query('iamFindPermissionById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermission>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}