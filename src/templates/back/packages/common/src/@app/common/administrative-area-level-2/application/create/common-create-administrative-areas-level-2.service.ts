import { CommonAddAdministrativeAreasLevel2ContextEvent, CommonAdministrativeAreaLevel2, CommonIAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2';
import {
    CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel2Code,
    CommonAdministrativeAreaLevel2CountryId,
    CommonAdministrativeAreaLevel2CreatedAt,
    CommonAdministrativeAreaLevel2CustomCode,
    CommonAdministrativeAreaLevel2DeletedAt,
    CommonAdministrativeAreaLevel2Id,
    CommonAdministrativeAreaLevel2Latitude,
    CommonAdministrativeAreaLevel2Longitude,
    CommonAdministrativeAreaLevel2MapType,
    CommonAdministrativeAreaLevel2Name,
    CommonAdministrativeAreaLevel2Slug,
    CommonAdministrativeAreaLevel2UpdatedAt,
    CommonAdministrativeAreaLevel2Zoom,
} from '@app/common/administrative-area-level-2/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonCreateAdministrativeAreasLevel2Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAdministrativeAreaLevel2Repository,
    ) {}

    async main(
        payload: {
            id: CommonAdministrativeAreaLevel2Id;
            countryId: CommonAdministrativeAreaLevel2CountryId;
            administrativeAreaLevel1Id: CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id;
            code: CommonAdministrativeAreaLevel2Code;
            customCode: CommonAdministrativeAreaLevel2CustomCode;
            name: CommonAdministrativeAreaLevel2Name;
            slug: CommonAdministrativeAreaLevel2Slug;
            latitude: CommonAdministrativeAreaLevel2Latitude;
            longitude: CommonAdministrativeAreaLevel2Longitude;
            zoom: CommonAdministrativeAreaLevel2Zoom;
            mapType: CommonAdministrativeAreaLevel2MapType;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateAdministrativeAreasLevel2 = payload.map(administrativeAreaLevel2 => CommonAdministrativeAreaLevel2.register(
            administrativeAreaLevel2.id,
            administrativeAreaLevel2.countryId,
            administrativeAreaLevel2.administrativeAreaLevel1Id,
            administrativeAreaLevel2.code,
            administrativeAreaLevel2.customCode,
            administrativeAreaLevel2.name,
            administrativeAreaLevel2.slug,
            administrativeAreaLevel2.latitude,
            administrativeAreaLevel2.longitude,
            administrativeAreaLevel2.zoom,
            administrativeAreaLevel2.mapType,
            new CommonAdministrativeAreaLevel2CreatedAt({ currentTimestamp: true }),
            new CommonAdministrativeAreaLevel2UpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateAdministrativeAreasLevel2,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddAdministrativeAreasLevel2ContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const administrativeAreasLevel2Registered = this.publisher.mergeObjectContext(new CommonAddAdministrativeAreasLevel2ContextEvent(aggregateAdministrativeAreasLevel2));

        administrativeAreasLevel2Registered.created(); // apply event to model events
        administrativeAreasLevel2Registered.commit(); // commit all events of model
    }
}
