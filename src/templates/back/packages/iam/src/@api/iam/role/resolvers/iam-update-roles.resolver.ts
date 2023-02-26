import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdateRolesHandler } from '../handlers/iam-update-roles.handler';
import { IamRole, IamUpdateRolesInput } from '@api/graphql';

@Resolver()
@Auth('iam.role.update')
export class IamUpdateRolesResolver
{
    constructor(
        private readonly handler: IamUpdateRolesHandler,
    ) {}

    @Mutation('iamUpdateRoles')
    async main(
        @Args('payload') payload: IamUpdateRolesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamRole>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}