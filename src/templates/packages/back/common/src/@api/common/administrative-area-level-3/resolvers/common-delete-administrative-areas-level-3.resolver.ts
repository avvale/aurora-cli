import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { GetAdministrativeAreasLevel3Query } from '../../../../@apps/common/administrative-area-level-3/application/get/get-administrative-areas-level-3.query';
import { DeleteAdministrativeAreasLevel3Command } from '../../../../@apps/common/administrative-area-level-3/application/delete/delete-administrative-areas-level-3.command';

@Resolver()
export class CommonDeleteAdministrativeAreasLevel3Resolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('commonDeleteAdministrativeAreasLevel3')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const administrativeAreasLevel3 = await this.queryBus.ask(new GetAdministrativeAreasLevel3Query(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreasLevel3Command(queryStatement, constraint, { timezone }));

        return administrativeAreasLevel3;
    }
}