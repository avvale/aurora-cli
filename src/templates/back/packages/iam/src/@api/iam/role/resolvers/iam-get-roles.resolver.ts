import { IamRole } from '@api/graphql';
import { IamGetRolesHandler } from '@api/iam/role';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.role.get')
export class IamGetRolesResolver
{
    constructor(
        private readonly handler: IamGetRolesHandler,
    ) {}

    @Query('iamGetRoles')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamRole[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
