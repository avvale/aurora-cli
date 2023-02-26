import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeleteRoleByIdHandler } from '../handlers/iam-delete-role-by-id.handler';
import { IamRole } from '@api/graphql';

@Resolver()
@Auth('iam.role.delete')
export class IamDeleteRoleByIdResolver
{
    constructor(
        private readonly handler: IamDeleteRoleByIdHandler,
    ) {}

    @Mutation('iamDeleteRoleById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamRole>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}