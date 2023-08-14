import { CommonAdministrativeAreaLevel3, CommonIAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3';
import {
    CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id,
    CommonAdministrativeAreaLevel3Code,
    CommonAdministrativeAreaLevel3CountryId,
    CommonAdministrativeAreaLevel3CreatedAt,
    CommonAdministrativeAreaLevel3CustomCode,
    CommonAdministrativeAreaLevel3DeletedAt,
    CommonAdministrativeAreaLevel3Id,
    CommonAdministrativeAreaLevel3Latitude,
    CommonAdministrativeAreaLevel3Longitude,
    CommonAdministrativeAreaLevel3MapType,
    CommonAdministrativeAreaLevel3Name,
    CommonAdministrativeAreaLevel3Slug,
    CommonAdministrativeAreaLevel3UpdatedAt,
    CommonAdministrativeAreaLevel3Zoom,
} from '@app/common/administrative-area-level-3/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonCreateAdministrativeAreaLevel3Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAdministrativeAreaLevel3Repository,
    ) {}

    async main(
        payload: {
            id: CommonAdministrativeAreaLevel3Id;
            countryId: CommonAdministrativeAreaLevel3CountryId;
            administrativeAreaLevel1Id: CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id;
            administrativeAreaLevel2Id: CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id;
            code: CommonAdministrativeAreaLevel3Code;
            customCode: CommonAdministrativeAreaLevel3CustomCode;
            name: CommonAdministrativeAreaLevel3Name;
            slug: CommonAdministrativeAreaLevel3Slug;
            latitude: CommonAdministrativeAreaLevel3Latitude;
            longitude: CommonAdministrativeAreaLevel3Longitude;
            zoom: CommonAdministrativeAreaLevel3Zoom;
            mapType: CommonAdministrativeAreaLevel3MapType;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const administrativeAreaLevel3 = CommonAdministrativeAreaLevel3.register(
            payload.id,
            payload.countryId,
            payload.administrativeAreaLevel1Id,
            payload.administrativeAreaLevel2Id,
            payload.code,
            payload.customCode,
            payload.name,
            payload.slug,
            payload.latitude,
            payload.longitude,
            payload.zoom,
            payload.mapType,
            new CommonAdministrativeAreaLevel3CreatedAt({ currentTimestamp: true }),
            new CommonAdministrativeAreaLevel3UpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            administrativeAreaLevel3,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const administrativeAreaLevel3Register = this.publisher.mergeObjectContext(
            administrativeAreaLevel3,
        );

        administrativeAreaLevel3Register.created(administrativeAreaLevel3); // apply event to model events
        administrativeAreaLevel3Register.commit(); // commit all events of model
    }
}
