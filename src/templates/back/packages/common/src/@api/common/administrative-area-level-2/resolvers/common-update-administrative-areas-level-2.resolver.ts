import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonUpdateAdministrativeAreasLevel2Handler } from '../handlers/common-update-administrative-areas-level-2.handler';
import { CommonAdministrativeAreaLevel2, CommonUpdateAdministrativeAreasLevel2Input } from '@api/graphql';

@Resolver()
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
    ): Promise<CommonAdministrativeAreaLevel2>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}