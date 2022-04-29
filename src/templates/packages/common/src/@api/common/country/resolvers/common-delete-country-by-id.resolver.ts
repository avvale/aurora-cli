import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, AddI18NConstraintService, ContentLanguage, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindCountryByIdQuery } from '../../../../@apps/common/country/application/find/find-country-by-id.query';
import { DeleteCountryByIdCommand } from '../../../../@apps/common/country/application/delete/delete-country-by-id.command';

@Resolver()
export class CommonDeleteCountryByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    @Mutation('commonDeleteCountryById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    )
    {
        constraint = await this.addI18NConstraintService.main(constraint, 'countryI18N', contentLanguage);
        const country = await this.queryBus.ask(new FindCountryByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteCountryByIdCommand(id, constraint, { timezone }));

        return country;
    }
}