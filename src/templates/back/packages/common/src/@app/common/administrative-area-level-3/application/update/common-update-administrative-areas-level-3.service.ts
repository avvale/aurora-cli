import { CommonAddAdministrativeAreasLevel3ContextEvent, CommonAdministrativeAreaLevel3, CommonIAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3';
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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonUpdateAdministrativeAreasLevel3Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAdministrativeAreaLevel3Repository,
    ) {}

    async main(
        payload: {
            id?: CommonAdministrativeAreaLevel3Id;
            countryId?: CommonAdministrativeAreaLevel3CountryId;
            administrativeAreaLevel1Id?: CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id;
            administrativeAreaLevel2Id?: CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id;
            code?: CommonAdministrativeAreaLevel3Code;
            customCode?: CommonAdministrativeAreaLevel3CustomCode;
            name?: CommonAdministrativeAreaLevel3Name;
            slug?: CommonAdministrativeAreaLevel3Slug;
            latitude?: CommonAdministrativeAreaLevel3Latitude;
            longitude?: CommonAdministrativeAreaLevel3Longitude;
            zoom?: CommonAdministrativeAreaLevel3Zoom;
            mapType?: CommonAdministrativeAreaLevel3MapType;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
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
            null, // createdAt
            new CommonAdministrativeAreaLevel3UpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update
        await this.repository.update(
            administrativeAreaLevel3,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const administrativeAreasLevel3 = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const administrativeAreasLevel3Register = this.publisher.mergeObjectContext(
            new CommonAddAdministrativeAreasLevel3ContextEvent(administrativeAreasLevel3),
        );

        administrativeAreasLevel3Register.updated(); // apply event to model events
        administrativeAreasLevel3Register.commit(); // commit all events of model
    }
}
