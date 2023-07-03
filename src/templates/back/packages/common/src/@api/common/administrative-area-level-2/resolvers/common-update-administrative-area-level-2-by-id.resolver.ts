import { CommonUpdateAdministrativeAreaLevel2ByIdHandler } from '@api/common/administrative-area-level-2';
import { CommonAdministrativeAreaLevel2, CommonUpdateAdministrativeAreaLevel2ByIdInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel2.update')
export class CommonUpdateAdministrativeAreaLevel2ByIdResolver
{
    constructor(
        private readonly handler: CommonUpdateAdministrativeAreaLevel2ByIdHandler,
    ) {}

    @Mutation('commonUpdateAdministrativeAreaLevel2ById')
    async main(
        @Args('payload') payload: CommonUpdateAdministrativeAreaLevel2ByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel2>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}