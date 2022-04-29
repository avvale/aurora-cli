import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamDeletePermissionByIdHandler } from '../handlers/iam-delete-permission-by-id.handler';
import { IamPermission } from '../../../../graphql';

@Resolver()
export class IamDeletePermissionByIdResolver
{
    constructor(
        private readonly handler: IamDeletePermissionByIdHandler,
    ) {}

    @Mutation('iamDeletePermissionById')
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