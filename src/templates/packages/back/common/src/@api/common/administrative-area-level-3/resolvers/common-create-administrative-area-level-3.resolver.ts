import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';

// @apps
import { FindAdministrativeAreaLevel3ByIdQuery } from '../../../../@apps/common/administrative-area-level-3/application/find/find-administrative-area-level-3-by-id.query';
import { CreateAdministrativeAreaLevel3Command } from '../../../../@apps/common/administrative-area-level-3/application/create/create-administrative-area-level-3.command';
import { CommonCreateAdministrativeAreaLevel3Input } from './../../../../graphql';

@Resolver()
export class CommonCreateAdministrativeAreaLevel3Resolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('commonCreateAdministrativeAreaLevel3')
    async main(
        @Args('payload') payload: CommonCreateAdministrativeAreaLevel3Input,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreaLevel3Command(payload, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel3ByIdQuery(payload.id, {}, { timezone }));
    }
}