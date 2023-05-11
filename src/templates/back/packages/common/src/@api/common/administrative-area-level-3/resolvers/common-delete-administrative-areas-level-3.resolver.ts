import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonDeleteAdministrativeAreasLevel3Handler } from '../handlers/common-delete-administrative-areas-level-3.handler';
import { CommonAdministrativeAreaLevel3 } from '@api/graphql';

@Resolver()
export class CommonDeleteAdministrativeAreasLevel3Resolver
{
    constructor(
        private readonly handler: CommonDeleteAdministrativeAreasLevel3Handler,
    ) {}

    @Mutation('commonDeleteAdministrativeAreasLevel3')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel3[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}