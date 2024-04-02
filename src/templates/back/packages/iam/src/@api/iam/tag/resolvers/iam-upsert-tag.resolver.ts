import { IamTag, IamUpdateTagByIdInput } from '@api/graphql';
import { IamUpsertTagHandler } from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tag.upsert')
export class IamUpsertTagResolver
{
    constructor(
        private readonly handler: IamUpsertTagHandler,
    ) {}

    @Mutation('iamUpsertTag')
    async main(
        @Args('payload') payload: IamUpdateTagByIdInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamTag>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
