import { CommonUpdateResourceByIdHandler } from '@api/common/resource';
import { CommonResource, CommonUpdateResourceByIdInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.resource.update')
export class CommonUpdateResourceByIdResolver
{
    constructor(
        private readonly handler: CommonUpdateResourceByIdHandler,
    ) {}

    @Mutation('commonUpdateResourceById')
    async main(
        @Args('payload') payload: CommonUpdateResourceByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonResource>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}
