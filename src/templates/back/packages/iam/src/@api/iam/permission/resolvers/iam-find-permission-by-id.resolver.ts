import { IamPermission } from '@api/graphql';
import { IamFindPermissionByIdHandler } from '@api/iam/permission';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.permission.get')
export class IamFindPermissionByIdResolver {
    constructor(private readonly handler: IamFindPermissionByIdHandler) {}

    @Query('iamFindPermissionById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermission> {
        return await this.handler.main(id, constraint, timezone);
    }
}
