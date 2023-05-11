import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindRoleByIdHandler } from '../handlers/iam-find-role-by-id.handler';
import { IamRole } from '@api/graphql';

@Resolver()
@Auth('iam.role.get')
export class IamFindRoleByIdResolver
{
    constructor(
        private readonly handler: IamFindRoleByIdHandler,
    ) {}

    @Query('iamFindRoleById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamRole>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}