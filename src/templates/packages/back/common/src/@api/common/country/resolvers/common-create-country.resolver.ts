import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AddI18NConstraintService, FormatLangCode, ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';

// @apps
import { FindCountryByIdQuery } from '../../../../@apps/common/country/application/find/find-country-by-id.query';
import { CreateCountryCommand } from '../../../../@apps/common/country/application/create/create-country.command';
import { CommonCreateCountryInput } from './../../../../graphql';

@Resolver()
export class CommonCreateCountryResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    @Mutation('commonCreateCountry')
    async main(
        @Args('payload') payload: CommonCreateCountryInput,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateCountryCommand(payload, { timezone }));

        const constraint = await this.addI18NConstraintService.main({}, 'countryI18N', payload.langId, { contentLanguageFormat: FormatLangCode.ID });
        return await this.queryBus.ask(new FindCountryByIdQuery(payload.id, constraint, { timezone }));
    }
}