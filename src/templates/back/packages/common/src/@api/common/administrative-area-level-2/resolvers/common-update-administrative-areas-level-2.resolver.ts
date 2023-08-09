import { CommonUpdateAdministrativeAreasLevel2Handler } from '@api/common/administrative-area-level-2';
import { CommonAdministrativeAreaLevel2, CommonUpdateAdministrativeAreasLevel2Input } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel2.update')
export class CommonUpdateAdministrativeAreasLevel2Resolver
{
    constructor(
        private readonly handler: CommonUpdateAdministrativeAreasLevel2Handler,
    ) {}

    @Mutation('commonUpdateAdministrativeAreasLevel2')
    async main(
        @Args('payload') payload: CommonUpdateAdministrativeAreasLevel2Input,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel2>
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
