import { IamCreateTagInput, IamTag } from '@api/graphql';
import { IamCreateTagHandler } from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tag.create')
export class IamCreateTagResolver
{
    constructor(
        private readonly handler: IamCreateTagHandler,
    ) {}

    @Mutation('iamCreateTag')
    async main(
        @Args('payload') payload: IamCreateTagInput,
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
