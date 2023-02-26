import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeleteUserByIdHandler } from '../handlers/iam-delete-user-by-id.handler';
import { IamUser } from '@api/graphql';

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