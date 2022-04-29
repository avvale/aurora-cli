import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindAdministrativeAreaLevel2ByIdQuery } from '../../../../@apps/common/administrative-area-level-2/application/find/find-administrative-area-level-2-by-id.query';
import { UpdateAdministrativeAreaLevel2Command } from '../../../../@apps/common/administrative-area-level-2/application/update/update-administrative-area-level-2.command';
import { CommonUpdateAdministrativeAreaLevel2Input } from './../../../../graphql';

@Resolver()
export class CommonUpdateAdministrativeAreaLevel2Resolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('commonUpdateAdministrativeAreaLevel2')
    async main(
        @Args('payload') payload: CommonUpdateAdministrativeAreaLevel2Input,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateAdministrativeAreaLevel2Command(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel2ByIdQuery(payload.id, constraint, { timezone }));
    }
}