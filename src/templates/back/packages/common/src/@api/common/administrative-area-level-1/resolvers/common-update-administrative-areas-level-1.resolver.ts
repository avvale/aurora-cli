import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonUpdateAdministrativeAreasLevel1Handler } from '../handlers/common-update-administrative-areas-level-1.handler';
import { CommonAdministrativeAreaLevel1, CommonUpdateAdministrativeAreasLevel1Input } from '@api/graphql';

@Resolver()
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
    ): Promise<CommonAdministrativeAreaLevel1>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}