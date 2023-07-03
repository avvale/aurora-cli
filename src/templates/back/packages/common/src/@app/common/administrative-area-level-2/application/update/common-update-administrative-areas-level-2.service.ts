import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    CommonAdministrativeAreaLevel2Id,
    CommonAdministrativeAreaLevel2CountryId,
    CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel2Code,
    CommonAdministrativeAreaLevel2CustomCode,
    CommonAdministrativeAreaLevel2Name,
    CommonAdministrativeAreaLevel2Slug,
    CommonAdministrativeAreaLevel2Latitude,
    CommonAdministrativeAreaLevel2Longitude,
    CommonAdministrativeAreaLevel2Zoom,
    CommonAdministrativeAreaLevel2MapType,
    CommonAdministrativeAreaLevel2CreatedAt,
    CommonAdministrativeAreaLevel2UpdatedAt,
    CommonAdministrativeAreaLevel2DeletedAt,
} from '../../domain/value-objects';
import { CommonIAdministrativeAreaLevel2Repository } from '../../domain/common-administrative-area-level-2.repository';
import { CommonAdministrativeAreaLevel2 } from '../../domain/common-administrative-area-level-2.aggregate';
import { CommonAddAdministrativeAreasLevel2ContextEvent } from '../events/common-add-administrative-areas-level-2-context.event';

@Injectable()
export class CommonUpdateAdministrativeAreasLevel2Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAdministrativeAreaLevel2Repository,
    ) {}

    async main(
        payload: {
            id?: CommonAdministrativeAreaLevel2Id;
            countryId?: CommonAdministrativeAreaLevel2CountryId;
            administrativeAreaLevel1Id?: CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id;
            code?: CommonAdministrativeAreaLevel2Code;
            customCode?: CommonAdministrativeAreaLevel2CustomCode;
            name?: CommonAdministrativeAreaLevel2Name;
            slug?: CommonAdministrativeAreaLevel2Slug;
            latitude?: CommonAdministrativeAreaLevel2Latitude;
            longitude?: CommonAdministrativeAreaLevel2Longitude;
            zoom?: CommonAdministrativeAreaLevel2Zoom;
            mapType?: CommonAdministrativeAreaLevel2MapType;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const administrativeAreaLevel2 = CommonAdministrativeAreaLevel2.register(
            payload.id,
            payload.countryId,
            payload.administrativeAreaLevel1Id,
            payload.code,
            payload.customCode,
            payload.name,
            payload.slug,
            payload.latitude,
            payload.longitude,
            payload.zoom,
            payload.mapType,
            null, // createdAt
            new CommonAdministrativeAreaLevel2UpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(
            administrativeAreaLevel2,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const administrativeAreasLevel2 = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const administrativeAreasLevel2Register = this.publisher.mergeObjectContext(
            new CommonAddAdministrativeAreasLevel2ContextEvent(administrativeAreasLevel2),
        );

        administrativeAreasLevel2Register.updated(); // apply event to model events
        administrativeAreasLevel2Register.commit(); // commit all events of model
    }
}