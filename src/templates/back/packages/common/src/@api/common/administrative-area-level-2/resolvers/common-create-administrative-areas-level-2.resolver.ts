import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonCreateAdministrativeAreasLevel2Handler } from '../handlers/common-create-administrative-areas-level-2.handler';
import { CommonCreateAdministrativeAreaLevel2Input } from '@api/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel2.create')
export class CommonCreateAdministrativeAreasLevel2Resolver
{
    constructor(
        private readonly handler: CommonCreateAdministrativeAreasLevel2Handler,
    ) {}

    @Mutation('commonCreateAdministrativeAreasLevel2')
    async main(
        @Args('payload') payload: CommonCreateAdministrativeAreaLevel2Input[],
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