import { CommonDeleteAdministrativeAreasLevel2Handler } from '@api/common/administrative-area-level-2';
import { CommonAdministrativeAreaLevel2 } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel2.delete')
export class CommonDeleteAdministrativeAreasLevel2Resolver
{
    constructor(
        private readonly handler: CommonDeleteAdministrativeAreasLevel2Handler,
    ) {}

    @Mutation('commonDeleteAdministrativeAreasLevel2')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel2[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
