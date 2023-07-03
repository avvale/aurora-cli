import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonCreateAdministrativeAreasLevel1Handler } from '../handlers/common-create-administrative-areas-level-1.handler';
import { CommonCreateAdministrativeAreaLevel1Input } from '@api/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel1.create')
export class CommonCreateAdministrativeAreasLevel1Resolver
{
    constructor(
        private readonly handler: CommonCreateAdministrativeAreasLevel1Handler,
    ) {}

    @Mutation('commonCreateAdministrativeAreasLevel1')
    async main(
        @Args('payload') payload: CommonCreateAdministrativeAreaLevel1Input[],
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