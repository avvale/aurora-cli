import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonUpdateAdministrativeAreasLevel3Handler } from '../handlers/common-update-administrative-areas-level-3.handler';
import { CommonAdministrativeAreaLevel3, CommonUpdateAdministrativeAreasLevel3Input } from '@api/graphql';

@Resolver()
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
    ): Promise<CommonAdministrativeAreaLevel3>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}