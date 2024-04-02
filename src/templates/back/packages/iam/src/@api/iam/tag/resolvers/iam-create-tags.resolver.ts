import { IamCreateTagInput } from '@api/graphql';
import { IamCreateTagsHandler } from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tag.create')
export class IamCreateTagsResolver
{
    constructor(
        private readonly handler: IamCreateTagsHandler,
    ) {}

    @Mutation('iamCreateTags')
    async main(
        @Args('payload') payload: IamCreateTagInput[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
