import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamGetRolesHandler } from '../handlers/iam-get-roles.handler';
import { IamRole } from '@api/graphql';

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