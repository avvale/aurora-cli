import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { GetAdministrativeAreasLevel1Query } from '../../../../@apps/common/administrative-area-level-1/application/get/get-administrative-areas-level-1.query';
import { DeleteAdministrativeAreasLevel1Command } from '../../../../@apps/common/administrative-area-level-1/application/delete/delete-administrative-areas-level-1.command';

@Resolver()
export class CommonDeleteAdministrativeAreasLevel1Resolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('commonDeleteAdministrativeAreasLevel1')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const administrativeAreasLevel1 = await this.queryBus.ask(new GetAdministrativeAreasLevel1Query(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreasLevel1Command(queryStatement, constraint, { timezone }));

        return administrativeAreasLevel1;
    }
}