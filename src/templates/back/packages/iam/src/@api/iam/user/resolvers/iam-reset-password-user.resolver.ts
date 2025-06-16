import { IamResetPasswordUserInput } from '@api/graphql';
import { IamResetPasswordUserHandler } from '@api/iam/user';
import { Auditing, AuditingMeta } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class IamResetPasswordUserResolver
{
    constructor(
        private readonly handler: IamResetPasswordUserHandler,
    ) {}

    @Mutation('iamResetPasswordUser')
    async main(
        @Args('payload') payload: IamResetPasswordUserInput,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            auditing,
        );
    }
}
