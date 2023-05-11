import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpsertRoleHandler } from '../handlers/iam-upsert-role.handler';
import { IamRole, IamUpdateRoleByIdInput } from '@api/graphql';

@Resolver()
@Auth('iam.role.upsert')
export class IamUpsertRoleResolver
{
    constructor(
        private readonly handler: IamUpsertRoleHandler,
    ) {}

    @Mutation('iamUpsertRole')
    async main(
        @Args('payload') payload: IamUpdateRoleByIdInput,
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