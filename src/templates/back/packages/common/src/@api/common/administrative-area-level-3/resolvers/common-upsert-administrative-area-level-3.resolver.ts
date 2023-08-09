import { CommonUpsertAdministrativeAreaLevel3Handler } from '@api/common/administrative-area-level-3';
import { CommonAdministrativeAreaLevel3, CommonUpdateAdministrativeAreaLevel3ByIdInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel3.upsert')
export class CommonUpsertAdministrativeAreaLevel3Resolver
{
    constructor(
        private readonly handler: CommonUpsertAdministrativeAreaLevel3Handler,
    ) {}

    @Mutation('commonUpsertAdministrativeAreaLevel3')
    async main(
        @Args('payload') payload: CommonUpdateAdministrativeAreaLevel3ByIdInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel3>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
