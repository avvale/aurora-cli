import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindAdministrativeAreaLevel1ByIdQuery } from '../../../../@apps/common/administrative-area-level-1/application/find/find-administrative-area-level-1-by-id.query';
import { UpdateAdministrativeAreaLevel1Command } from '../../../../@apps/common/administrative-area-level-1/application/update/update-administrative-area-level-1.command';
import { CommonUpdateAdministrativeAreaLevel1Input } from './../../../../graphql';

@Resolver()
export class CommonUpdateAdministrativeAreaLevel1Resolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('commonUpdateAdministrativeAreaLevel1')
    async main(
        @Args('payload') payload: CommonUpdateAdministrativeAreaLevel1Input,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateAdministrativeAreaLevel1Command(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel1ByIdQuery(payload.id, constraint, { timezone }));
    }
}