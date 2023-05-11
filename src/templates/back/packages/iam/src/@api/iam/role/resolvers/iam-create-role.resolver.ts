import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamCreateRoleHandler } from '../handlers/iam-create-role.handler';
import { IamRole, IamCreateRoleInput } from '@api/graphql';

@Resolver()
@Auth('iam.role.create')
export class IamCreateRoleResolver
{
    constructor(
        private readonly handler: IamCreateRoleHandler,
    ) {}

    @Mutation('iamCreateRole')
    async main(
        @Args('payload') payload: IamCreateRoleInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamRole>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}