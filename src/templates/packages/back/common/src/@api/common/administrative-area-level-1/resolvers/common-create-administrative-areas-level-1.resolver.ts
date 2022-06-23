import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { CommonCreateAdministrativeAreasLevel1Handler } from '../handlers/common-create-administrative-areas-level-1.handler';
import { CommonCreateAdministrativeAreaLevel1Input } from '../../../../graphql';

@Resolver()
export class CommonCreateAdministrativeAreasLevel1Resolver
{
    constructor(
        private readonly handler: CommonCreateAdministrativeAreasLevel1Handler,
    ) {}

    @Mutation('commonCreateAdministrativeAreasLevel1')
    async main(
        @Args('payload') payload: CommonCreateAdministrativeAreaLevel1Input[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}