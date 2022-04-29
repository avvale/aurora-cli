import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';

// @apps
import { CreateCountriesCommand } from '../../../../@apps/common/country/application/create/create-countries.command';
import { CommonCreateCountryInput } from './../../../../graphql';

@Resolver()
export class CommonCreateCountriesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('commonCreateCountries')
    async main(
        @Args('payload') payload: CommonCreateCountryInput[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateCountriesCommand(payload, { timezone }));
        return true;
    }
}