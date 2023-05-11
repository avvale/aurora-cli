import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamCreateRolesHandler } from '../handlers/iam-create-roles.handler';
import { IamCreateRoleInput } from '@api/graphql';

@Resolver()
@Auth('iam.role.create')
export class IamCreateRolesResolver
{
    constructor(
        private readonly handler: IamCreateRolesHandler,
    ) {}

    @Mutation('iamCreateRoles')
    async main(
        @Args('payload') payload: IamCreateRoleInput[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}