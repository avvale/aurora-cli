import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { CountryAvailableLangs, CountryId } from '../../domain/value-objects';
import { ICountryRepository } from '../../domain/country.repository';
import { ICountryI18nRepository } from '../../domain/country-i18n.repository';

@Injectable()
export class DeleteCountryByIdI18nService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ICountryRepository,
        private readonly repositoryI18n: ICountryI18nRepository,
    ) {}

    async main(id: CountryId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const country = await this.repository.findById(id, { constraint, cQMetadata });

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repositoryI18n.delete({
            queryStatement: {
                where: {
                    langId: country.langId.value,
                    countryId: country.id.value,
                }
            }
        });

        const availableLangs = country.availableLangs.value.removeItem(country.langId.value);

        // if has not any translation in i18n table, delete record
        if (availableLangs.length === 0)
        {
            await this.repository.deleteById(country.id, { cQMetadata });
        }
        else
        {
            country.availableLangs = new CountryAvailableLangs(availableLangs);
            await this.repository.update(country);
        }

        // insert EventBus in object, to be able to apply and commit events
        const countryRegister = this.publisher.mergeObjectContext(country);

        countryRegister.deleted(country); // apply event to model events
        countryRegister.commit(); // commit all events of model
    }
}