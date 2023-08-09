import { CommonCreateAdministrativeAreaLevel3Handler } from '@api/common/administrative-area-level-3';
import { CommonAdministrativeAreaLevel3, CommonCreateAdministrativeAreaLevel3Input } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel3.create')
export class CommonCreateAdministrativeAreaLevel3Resolver
{
    constructor(
        private readonly handler: CommonCreateAdministrativeAreaLevel3Handler,
    ) {}

    @Mutation('commonCreateAdministrativeAreaLevel3')
    async main(
        @Args('payload') payload: CommonCreateAdministrativeAreaLevel3Input,
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
