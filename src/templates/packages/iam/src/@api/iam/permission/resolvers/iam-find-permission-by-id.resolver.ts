import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamFindPermissionByIdHandler } from '../handlers/iam-find-permission-by-id.handler';
import { IamPermission } from '../../../../graphql';

@Resolver()
export class IamFindPermissionByIdResolver
{
    constructor(
        private readonly handler: IamFindPermissionByIdHandler,
    ) {}

    @Query('iamFindPermissionById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
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