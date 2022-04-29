import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, AddI18NConstraintService, FormatLangCode, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindCountryByIdQuery } from '../../../../@apps/common/country/application/find/find-country-by-id.query';
import { UpdateCountryCommand } from '../../../../@apps/common/country/application/update/update-country.command';
import { CommonUpdateCountryInput } from './../../../../graphql';

@Resolver()
export class CommonUpdateCountryResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    @Mutation('commonUpdateCountry')
    async main(
        @Args('payload') payload: CommonUpdateCountryInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateCountryCommand(payload, constraint, { timezone }));

        constraint = await this.addI18NConstraintService.main({}, 'countryI18N', payload.langId, { contentLanguageFormat: FormatLangCode.ID });
        return await this.queryBus.ask(new FindCountryByIdQuery(payload.id, constraint, { timezone }));
    }
}