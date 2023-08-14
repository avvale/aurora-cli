import { IamUpdateUsersInput, IamUser } from '@api/graphql';
import { IamUpdateUsersHandler } from '@api/iam/user';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

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
