import { IamUser } from '@api/graphql';
import { IamDeleteUserByIdHandler } from '@api/iam/user';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.user.delete')
export class IamDeleteUserByIdResolver
{
    constructor(
        private readonly handler: IamDeleteUserByIdHandler,
    ) {}

    @Mutation('iamDeleteUserById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamUser>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}
