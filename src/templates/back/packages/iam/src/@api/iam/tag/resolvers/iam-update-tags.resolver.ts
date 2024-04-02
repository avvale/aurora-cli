import { IamTag, IamUpdateTagsInput } from '@api/graphql';
import { IamUpdateTagsHandler } from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tag.update')
export class IamUpdateTagsResolver
{
    constructor(
        private readonly handler: IamUpdateTagsHandler,
    ) {}

    @Mutation('iamUpdateTags')
    async main(
        @Args('payload') payload: IamUpdateTagsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamTag>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
