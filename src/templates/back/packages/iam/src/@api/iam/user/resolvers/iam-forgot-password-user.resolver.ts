import { IamForgotPasswordUserInput } from '@api/graphql';
import { IamForgotPasswordUserHandler } from '@api/iam/user';
import { Auditing, AuditingMeta } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class IamForgotPasswordUserResolver
{
    constructor(
        private readonly handler: IamForgotPasswordUserHandler,
    ) {}

    @Mutation('iamForgotPasswordUser')
    async main(
        @Args('payload') payload: IamForgotPasswordUserInput,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            auditing,
        );
    }
}
