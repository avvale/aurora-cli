import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    AdministrativeAreaLevel2Id,
    AdministrativeAreaLevel2CountryId,
    AdministrativeAreaLevel2AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel2Code,
    AdministrativeAreaLevel2CustomCode,
    AdministrativeAreaLevel2Name,
    AdministrativeAreaLevel2Slug,
    AdministrativeAreaLevel2Latitude,
    AdministrativeAreaLevel2Longitude,
    AdministrativeAreaLevel2Zoom,
    AdministrativeAreaLevel2CreatedAt,
    AdministrativeAreaLevel2UpdatedAt,
    AdministrativeAreaLevel2DeletedAt,
} from '../../domain/value-objects';
import { IAdministrativeAreaLevel2Repository } from '../../domain/administrative-area-level-2.repository';
import { CommonAdministrativeAreaLevel2 } from '../../domain/administrative-area-level-2.aggregate';
import { AddAdministrativeAreasLevel2ContextEvent } from '../events/add-administrative-areas-level-2-context.event';

@Injectable()
export class UpdateAdministrativeAreasLevel2Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAdministrativeAreaLevel2Repository,
    ) {}

    async main(
        payload: {
            id?: AdministrativeAreaLevel2Id;
            countryId?: AdministrativeAreaLevel2CountryId;
            administrativeAreaLevel1Id?: AdministrativeAreaLevel2AdministrativeAreaLevel1Id;
            code?: AdministrativeAreaLevel2Code;
            customCode?: AdministrativeAreaLevel2CustomCode;
            name?: AdministrativeAreaLevel2Name;
            slug?: AdministrativeAreaLevel2Slug;
            latitude?: AdministrativeAreaLevel2Latitude;
            longitude?: AdministrativeAreaLevel2Longitude;
            zoom?: AdministrativeAreaLevel2Zoom;
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
            null, // createdAt
            new AdministrativeAreaLevel2UpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(administrativeAreaLevel2, {
            queryStatement,
            constraint,
            cQMetadata,
            updateOptions: cQMetadata?.repositoryOptions,
        });

        // get objects to delete
        const administrativeAreasLevel2 = await this.repository.get({ queryStatement, constraint, cQMetadata });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const administrativeAreasLevel2Register = this.publisher.mergeObjectContext(
            new AddAdministrativeAreasLevel2ContextEvent(administrativeAreasLevel2),
        );

        administrativeAreasLevel2Register.updated(); // apply event to model events
        administrativeAreasLevel2Register.commit(); // commit all events of model
    }
}