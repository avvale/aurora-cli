import { CommonUpdateAdministrativeAreaLevel3ByIdHandler } from '@api/common/administrative-area-level-3';
import { CommonAdministrativeAreaLevel3, CommonUpdateAdministrativeAreaLevel3ByIdInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel3.update')
export class CommonUpdateAdministrativeAreaLevel3ByIdResolver
{
    constructor(
        private readonly handler: CommonUpdateAdministrativeAreaLevel3ByIdHandler,
    ) {}

    @Mutation('commonUpdateAdministrativeAreaLevel3ById')
    async main(
        @Args('payload') payload: CommonUpdateAdministrativeAreaLevel3ByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel3>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}
