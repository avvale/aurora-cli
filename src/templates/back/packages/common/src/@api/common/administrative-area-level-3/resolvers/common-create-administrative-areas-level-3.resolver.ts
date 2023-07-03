import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonCreateAdministrativeAreasLevel3Handler } from '../handlers/common-create-administrative-areas-level-3.handler';
import { CommonCreateAdministrativeAreaLevel3Input } from '@api/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel3.create')
export class CommonCreateAdministrativeAreasLevel3Resolver
{
    constructor(
        private readonly handler: CommonCreateAdministrativeAreasLevel3Handler,
    ) {}

    @Mutation('commonCreateAdministrativeAreasLevel3')
    async main(
        @Args('payload') payload: CommonCreateAdministrativeAreaLevel3Input[],
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