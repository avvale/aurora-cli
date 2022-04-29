import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';

// @apps
import { CreateAdministrativeAreasLevel3Command } from '../../../../@apps/common/administrative-area-level-3/application/create/create-administrative-areas-level-3.command';
import { CommonCreateAdministrativeAreaLevel3Input } from './../../../../graphql';

@Resolver()
export class CommonCreateAdministrativeAreasLevel3Resolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('commonCreateAdministrativeAreasLevel3')
    async main(
        @Args('payload') payload: CommonCreateAdministrativeAreaLevel3Input[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreasLevel3Command(payload, { timezone }));
        return true;
    }
}