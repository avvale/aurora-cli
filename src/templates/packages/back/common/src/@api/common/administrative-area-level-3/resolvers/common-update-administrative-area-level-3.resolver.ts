import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindAdministrativeAreaLevel3ByIdQuery } from '../../../../@apps/common/administrative-area-level-3/application/find/find-administrative-area-level-3-by-id.query';
import { UpdateAdministrativeAreaLevel3Command } from '../../../../@apps/common/administrative-area-level-3/application/update/update-administrative-area-level-3.command';
import { CommonUpdateAdministrativeAreaLevel3Input } from './../../../../graphql';

@Resolver()
export class CommonUpdateAdministrativeAreaLevel3Resolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('commonUpdateAdministrativeAreaLevel3')
    async main(
        @Args('payload') payload: CommonUpdateAdministrativeAreaLevel3Input,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateAdministrativeAreaLevel3Command(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel3ByIdQuery(payload.id, constraint, { timezone }));
    }
}