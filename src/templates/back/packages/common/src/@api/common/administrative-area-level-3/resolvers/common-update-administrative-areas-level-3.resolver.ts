import { CommonUpdateAdministrativeAreasLevel3Handler } from '@api/common/administrative-area-level-3';
import { CommonAdministrativeAreaLevel3, CommonUpdateAdministrativeAreasLevel3Input } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel3.update')
export class CommonUpdateAdministrativeAreasLevel3Resolver
{
    constructor(
        private readonly handler: CommonUpdateAdministrativeAreasLevel3Handler,
    ) {}

    @Mutation('commonUpdateAdministrativeAreasLevel3')
    async main(
        @Args('payload') payload: CommonUpdateAdministrativeAreasLevel3Input,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel3>
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