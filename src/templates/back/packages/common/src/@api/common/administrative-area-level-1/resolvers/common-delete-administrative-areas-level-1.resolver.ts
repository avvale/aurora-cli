import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonDeleteAdministrativeAreasLevel1Handler } from '../handlers/common-delete-administrative-areas-level-1.handler';
import { CommonAdministrativeAreaLevel1 } from '@api/graphql';

@Resolver()
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
    ): Promise<CommonAdministrativeAreaLevel1[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}