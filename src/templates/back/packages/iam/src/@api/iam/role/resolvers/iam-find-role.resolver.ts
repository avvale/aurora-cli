import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindRoleHandler } from '../handlers/iam-find-role.handler';
import { IamRole } from '@api/graphql';

@Resolver()
@Auth('iam.role.get')
export class IamFindRoleResolver
{
    constructor(
        private readonly handler: IamFindRoleHandler,
    ) {}

    @Query('iamFindRole')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamRole>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}