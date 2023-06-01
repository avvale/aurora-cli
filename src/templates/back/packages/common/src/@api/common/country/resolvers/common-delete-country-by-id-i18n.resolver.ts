import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AddI18nConstraintService, ContentLanguage, ICommandBus, IQueryBus, QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { FindCountryByIdQuery } from '@app/common/country/application/find/find-country-by-id.query';
import { DeleteCountryByIdI18nCommand } from '@app/common/country/application/delete/delete-country-by-id-i18n.command';

@Resolver()
export class CommonDeleteCountryByIdI18nResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly addI18nConstraintService: AddI18nConstraintService,
    ) {}

    @Mutation('commonDeleteCountryById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    )
    {
        constraint = await this.addI18nConstraintService.main(constraint, 'countryI18n', contentLanguage);
        const country = await this.queryBus.ask(new FindCountryByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteCountryByIdI18nCommand(id, constraint, { timezone }));

        return country;
    }
}