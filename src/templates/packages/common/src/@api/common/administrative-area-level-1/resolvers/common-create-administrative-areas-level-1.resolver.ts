import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';

// @apps
import { CreateAdministrativeAreasLevel1Command } from '../../../../@apps/common/administrative-area-level-1/application/create/create-administrative-areas-level-1.command';
import { CommonCreateAdministrativeAreaLevel1Input } from './../../../../graphql';

@Resolver()
export class CommonCreateAdministrativeAreasLevel1Resolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('commonCreateAdministrativeAreasLevel1')
    async main(
        @Args('payload') payload: CommonCreateAdministrativeAreaLevel1Input[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreasLevel1Command(payload, { timezone }));
        return true;
    }
}