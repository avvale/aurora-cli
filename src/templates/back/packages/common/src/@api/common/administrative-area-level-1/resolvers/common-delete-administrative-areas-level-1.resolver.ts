import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonDeleteAdministrativeAreasLevel1Handler } from '../handlers/common-delete-administrative-areas-level-1.handler';
import { CommonAdministrativeAreaLevel1 } from '@api/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel1.delete')
export class CommonDeleteAdministrativeAreasLevel1Resolver
{
    constructor(
        private readonly handler: CommonDeleteAdministrativeAreasLevel1Handler,
    ) {}

    @Mutation('commonDeleteAdministrativeAreasLevel1')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel1[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}