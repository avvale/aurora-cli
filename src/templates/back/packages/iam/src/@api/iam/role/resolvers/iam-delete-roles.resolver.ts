import { IamRole } from '@api/graphql';
import { IamDeleteRolesHandler } from '@api/iam/role';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.role.delete')
export class IamDeleteRolesResolver
{
    constructor(
        private readonly handler: IamDeleteRolesHandler,
    ) {}

    @Mutation('iamDeleteRoles')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamRole[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
