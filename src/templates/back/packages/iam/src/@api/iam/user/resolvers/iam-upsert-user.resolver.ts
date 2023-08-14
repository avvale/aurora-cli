import { IamUpdateUserByIdInput, IamUser } from '@api/graphql';
import { IamUpsertUserHandler } from '@api/iam/user';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

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
