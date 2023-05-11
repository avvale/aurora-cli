import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdateUsersHandler } from '../handlers/iam-update-users.handler';
import { IamUser, IamUpdateUsersInput } from '@api/graphql';

@Resolver()
@Auth('iam.user.update')
export class IamUpdateUsersResolver
{
    constructor(
        private readonly handler: IamUpdateUsersHandler,
    ) {}

    @Mutation('iamUpdateUsers')
    async main(
        @Args('payload') payload: IamUpdateUsersInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamUser>
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