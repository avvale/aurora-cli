import { IamTag } from '@api/graphql';
import { IamDeleteTagsHandler } from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tag.delete')
export class IamDeleteTagsResolver
{
    constructor(
        private readonly handler: IamDeleteTagsHandler,
    ) {}

    @Mutation('iamDeleteTags')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamTag[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
