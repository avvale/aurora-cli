import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeleteBoundedContextByIdHandler } from '../handlers/iam-delete-bounded-context-by-id.handler';
import { IamBoundedContext } from '@api/graphql';

@Resolver()
@Auth('iam.boundedContext.delete')
export class IamDeleteBoundedContextByIdResolver
{
    constructor(
        private readonly handler: IamDeleteBoundedContextByIdHandler,
    ) {}

    @Mutation('iamDeleteBoundedContextById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamBoundedContext>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}