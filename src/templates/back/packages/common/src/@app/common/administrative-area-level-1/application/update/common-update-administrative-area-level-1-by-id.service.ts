import { CommonAdministrativeAreaLevel1, CommonIAdministrativeAreaLevel1Repository } from '@app/common/administrative-area-level-1';
import {
    CommonAdministrativeAreaLevel1Code,
    CommonAdministrativeAreaLevel1CountryId,
    CommonAdministrativeAreaLevel1CreatedAt,
    CommonAdministrativeAreaLevel1CustomCode,
    CommonAdministrativeAreaLevel1DeletedAt,
    CommonAdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel1Latitude,
    CommonAdministrativeAreaLevel1Longitude,
    CommonAdministrativeAreaLevel1MapType,
    CommonAdministrativeAreaLevel1Name,
    CommonAdministrativeAreaLevel1Slug,
    CommonAdministrativeAreaLevel1UpdatedAt,
    CommonAdministrativeAreaLevel1Zoom,
} from '@app/common/administrative-area-level-1/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonUpdateAdministrativeAreaLevel1ByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAdministrativeAreaLevel1Repository,
    ) {}

    async main(
        payload: {
            id: CommonAdministrativeAreaLevel1Id;
            countryId?: CommonAdministrativeAreaLevel1CountryId;
            code?: CommonAdministrativeAreaLevel1Code;
            customCode?: CommonAdministrativeAreaLevel1CustomCode;
            name?: CommonAdministrativeAreaLevel1Name;
            slug?: CommonAdministrativeAreaLevel1Slug;
            latitude?: CommonAdministrativeAreaLevel1Latitude;
            longitude?: CommonAdministrativeAreaLevel1Longitude;
            zoom?: CommonAdministrativeAreaLevel1Zoom;
            mapType?: CommonAdministrativeAreaLevel1MapType;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const administrativeAreaLevel1 = CommonAdministrativeAreaLevel1.register(
            payload.id,
            payload.countryId,
            payload.code,
            payload.customCode,
            payload.name,
            payload.slug,
            payload.latitude,
            payload.longitude,
            payload.zoom,
            payload.mapType,
            null, // createdAt
            new CommonAdministrativeAreaLevel1UpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(
            administrativeAreaLevel1,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const administrativeAreaLevel1Register = this.publisher.mergeObjectContext(
            administrativeAreaLevel1,
        );

        administrativeAreaLevel1Register.updated(administrativeAreaLevel1); // apply event to model events
        administrativeAreaLevel1Register.commit(); // commit all events of model
    }
}