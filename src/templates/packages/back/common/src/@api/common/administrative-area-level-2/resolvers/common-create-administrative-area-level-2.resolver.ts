import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';

// @apps
import { FindAdministrativeAreaLevel2ByIdQuery } from '../../../../@apps/common/administrative-area-level-2/application/find/find-administrative-area-level-2-by-id.query';
import { CreateAdministrativeAreaLevel2Command } from '../../../../@apps/common/administrative-area-level-2/application/create/create-administrative-area-level-2.command';
import { CommonCreateAdministrativeAreaLevel2Input } from './../../../../graphql';

@Resolver()
export class CommonCreateAdministrativeAreaLevel2Resolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('commonCreateAdministrativeAreaLevel2')
    async main(
        @Args('payload') payload: CommonCreateAdministrativeAreaLevel2Input,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreaLevel2Command(payload, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel2ByIdQuery(payload.id, {}, { timezone }));
    }
}