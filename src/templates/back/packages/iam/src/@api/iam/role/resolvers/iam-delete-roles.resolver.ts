import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeleteRolesHandler } from '../handlers/iam-delete-roles.handler';
import { IamRole } from '@api/graphql';

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