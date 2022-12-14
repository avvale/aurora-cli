import { Injectable } from '@nestjs/common';
import { AddI18NConstraintService, ICommandBus } from '@aurora-ts/core';

// @apps
import { CreateCountriesCommand } from '@apps/common/country/application/create/create-countries.command';
import { CommonCreateCountryInput } from '@api/graphql';
import { CommonCreateCountryDto } from '../dto';

@Injectable()
export class CommonCreateCountriesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    async main(
        payload: CommonCreateCountryInput[] | CommonCreateCountryDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateCountriesCommand(payload, { timezone }));
        return true;
    }
}