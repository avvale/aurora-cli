import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    CommonAdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel1CountryId,
    CommonAdministrativeAreaLevel1Code,
    CommonAdministrativeAreaLevel1CustomCode,
    CommonAdministrativeAreaLevel1Name,
    CommonAdministrativeAreaLevel1Slug,
    CommonAdministrativeAreaLevel1Latitude,
    CommonAdministrativeAreaLevel1Longitude,
    CommonAdministrativeAreaLevel1Zoom,
    CommonAdministrativeAreaLevel1MapType,
    CommonAdministrativeAreaLevel1CreatedAt,
    CommonAdministrativeAreaLevel1UpdatedAt,
    CommonAdministrativeAreaLevel1DeletedAt,
} from '../../domain/value-objects';
import { CommonIAdministrativeAreaLevel1Repository } from '../../domain/common-administrative-area-level-1.repository';
import { CommonAdministrativeAreaLevel1 } from '../../domain/common-administrative-area-level-1.aggregate';
import { CommonAddAdministrativeAreasLevel1ContextEvent } from '../events/common-add-administrative-areas-level-1-context.event';

@Injectable()
export class CommonUpdateAdministrativeAreasLevel1Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAdministrativeAreaLevel1Repository,
    ) {}

    async main(
        payload: {
            id?: CommonAdministrativeAreaLevel1Id;
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
        queryStatement?: QueryStatement,
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


        // update
        await this.repository.update(
            administrativeAreaLevel1,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const administrativeAreasLevel1 = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const administrativeAreasLevel1Register = this.publisher.mergeObjectContext(
            new CommonAddAdministrativeAreasLevel1ContextEvent(administrativeAreasLevel1),
        );

        administrativeAreasLevel1Register.updated(); // apply event to model events
        administrativeAreasLevel1Register.commit(); // commit all events of model
    }
}