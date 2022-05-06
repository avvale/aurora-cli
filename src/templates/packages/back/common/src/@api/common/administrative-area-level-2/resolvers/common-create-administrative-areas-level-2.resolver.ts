import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';

// @apps
import { CreateAdministrativeAreasLevel2Command } from '../../../../@apps/common/administrative-area-level-2/application/create/create-administrative-areas-level-2.command';
import { CommonCreateAdministrativeAreaLevel2Input } from './../../../../graphql';

@Resolver()
export class CommonCreateAdministrativeAreasLevel2Resolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('commonCreateAdministrativeAreasLevel2')
    async main(
        @Args('payload') payload: CommonCreateAdministrativeAreaLevel2Input[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreasLevel2Command(payload, { timezone }));
        return true;
    }
}