import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from '@aurorajs.dev/core';

// @app
import { CommonCreateAdministrativeAreaLevel3Handler } from '../handlers/common-create-administrative-area-level-3.handler';
import { CommonAdministrativeAreaLevel3, CommonCreateAdministrativeAreaLevel3Input } from '@api/graphql';

@Resolver()
export class CommonCreateAdministrativeAreaLevel3Resolver
{
    constructor(
        private readonly handler: CommonCreateAdministrativeAreaLevel3Handler,
    ) {}

    @Mutation('commonCreateAdministrativeAreaLevel3')
    async main(
        @Args('payload') payload: CommonCreateAdministrativeAreaLevel3Input,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel3>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}