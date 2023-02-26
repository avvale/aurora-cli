import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpsertUserHandler } from '../handlers/iam-upsert-user.handler';
import { IamUser, IamUpdateUserByIdInput } from '@api/graphql';

@Resolver()
@Auth('iam.user.upsert')
export class IamUpsertUserResolver
{
    constructor(
        private readonly handler: IamUpsertUserHandler,
    ) {}

    @Mutation('iamUpsertUser')
    async main(
        @Args('payload') payload: IamUpdateUserByIdInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamUser>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}