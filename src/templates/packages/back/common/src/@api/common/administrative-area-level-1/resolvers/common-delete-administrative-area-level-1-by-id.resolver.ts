import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindAdministrativeAreaLevel1ByIdQuery } from '../../../../@apps/common/administrative-area-level-1/application/find/find-administrative-area-level-1-by-id.query';
import { DeleteAdministrativeAreaLevel1ByIdCommand } from '../../../../@apps/common/administrative-area-level-1/application/delete/delete-administrative-area-level-1-by-id.command';

@Resolver()
export class CommonDeleteAdministrativeAreaLevel1ByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('commonDeleteAdministrativeAreaLevel1ById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const administrativeAreaLevel1 = await this.queryBus.ask(new FindAdministrativeAreaLevel1ByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreaLevel1ByIdCommand(id, constraint, { timezone }));

        return administrativeAreaLevel1;
    }
}