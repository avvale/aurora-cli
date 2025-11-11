import { IamUser } from '@api/graphql';
import { IamDeleteUsersHandler } from '@api/iam/user';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.user.delete')
export class IamDeleteUsersResolver {
    constructor(private readonly handler: IamDeleteUsersHandler) {}

    @Mutation('iamDeleteUsers')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamUser[]> {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
