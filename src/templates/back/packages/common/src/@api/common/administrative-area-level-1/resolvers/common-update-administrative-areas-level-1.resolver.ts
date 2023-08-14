import { CommonUpdateAdministrativeAreasLevel1Handler } from '@api/common/administrative-area-level-1';
import { CommonAdministrativeAreaLevel1, CommonUpdateAdministrativeAreasLevel1Input } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel1.update')
export class CommonUpdateAdministrativeAreasLevel1Resolver
{
    constructor(
        private readonly handler: CommonUpdateAdministrativeAreasLevel1Handler,
    ) {}

    @Mutation('commonUpdateAdministrativeAreasLevel1')
    async main(
        @Args('payload') payload: CommonUpdateAdministrativeAreasLevel1Input,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel1>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
