import { IamTag, IamUpdateTagByIdInput } from '@api/graphql';
import { IamUpdateTagByIdHandler } from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tag.update')
export class IamUpdateTagByIdResolver
{
    constructor(
        private readonly handler: IamUpdateTagByIdHandler,
    ) {}

    @Mutation('iamUpdateTagById')
    async main(
        @Args('payload') payload: IamUpdateTagByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamTag>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}
