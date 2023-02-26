import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdateRoleByIdHandler } from '../handlers/iam-update-role-by-id.handler';
import { IamRole, IamUpdateRoleByIdInput } from '@api/graphql';

@Resolver()
@Auth('iam.role.update')
export class IamUpdateRoleByIdResolver
{
    constructor(
        private readonly handler: IamUpdateRoleByIdHandler,
    ) {}

    @Mutation('iamUpdateRoleById')
    async main(
        @Args('payload') payload: IamUpdateRoleByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamRole>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}