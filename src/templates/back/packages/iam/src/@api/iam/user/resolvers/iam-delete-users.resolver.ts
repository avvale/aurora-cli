import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeleteUsersHandler } from '../handlers/iam-delete-users.handler';
import { IamUser } from '@api/graphql';

@Resolver()
@Auth('iam.user.delete')
export class IamDeleteUsersResolver
{
    constructor(
        private readonly handler: IamDeleteUsersHandler,
    ) {}

    @Mutation('iamDeleteUsers')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamUser[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}