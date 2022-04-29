import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';

// @apps
import { FindAdministrativeAreaLevel1ByIdQuery } from '../../../../@apps/common/administrative-area-level-1/application/find/find-administrative-area-level-1-by-id.query';
import { CreateAdministrativeAreaLevel1Command } from '../../../../@apps/common/administrative-area-level-1/application/create/create-administrative-area-level-1.command';
import { CommonCreateAdministrativeAreaLevel1Input } from './../../../../graphql';

@Resolver()
export class CommonCreateAdministrativeAreaLevel1Resolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('commonCreateAdministrativeAreaLevel1')
    async main(
        @Args('payload') payload: CommonCreateAdministrativeAreaLevel1Input,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreaLevel1Command(payload, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel1ByIdQuery(payload.id, {}, { timezone }));
    }
}