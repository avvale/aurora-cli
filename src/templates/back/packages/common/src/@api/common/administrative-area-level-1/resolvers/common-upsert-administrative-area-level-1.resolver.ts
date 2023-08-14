import { CommonUpsertAdministrativeAreaLevel1Handler } from '@api/common/administrative-area-level-1';
import { CommonAdministrativeAreaLevel1, CommonUpdateAdministrativeAreaLevel1ByIdInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel1.upsert')
export class CommonUpsertAdministrativeAreaLevel1Resolver
{
    constructor(
        private readonly handler: CommonUpsertAdministrativeAreaLevel1Handler,
    ) {}

    @Mutation('commonUpsertAdministrativeAreaLevel1')
    async main(
        @Args('payload') payload: CommonUpdateAdministrativeAreaLevel1ByIdInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel1>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
