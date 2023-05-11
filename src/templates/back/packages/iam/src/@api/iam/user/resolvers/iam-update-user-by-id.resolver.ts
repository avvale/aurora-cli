import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdateUserByIdHandler } from '../handlers/iam-update-user-by-id.handler';
import { IamUser, IamUpdateUserByIdInput } from '@api/graphql';

@Resolver()
@Auth('iam.user.update')
export class IamUpdateUserByIdResolver
{
    constructor(
        private readonly handler: IamUpdateUserByIdHandler,
    ) {}

    @Mutation('iamUpdateUserById')
    async main(
        @Args('payload') payload: IamUpdateUserByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamUser>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}