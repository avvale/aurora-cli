import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel1CountryId,
    AdministrativeAreaLevel1Code,
    AdministrativeAreaLevel1CustomCode,
    AdministrativeAreaLevel1Name,
    AdministrativeAreaLevel1Slug,
    AdministrativeAreaLevel1Latitude,
    AdministrativeAreaLevel1Longitude,
    AdministrativeAreaLevel1Zoom,
    AdministrativeAreaLevel1CreatedAt,
    AdministrativeAreaLevel1UpdatedAt,
    AdministrativeAreaLevel1DeletedAt,
} from '../../domain/value-objects';
import { IAdministrativeAreaLevel1Repository } from '../../domain/administrative-area-level-1.repository';
import { CommonAdministrativeAreaLevel1 } from '../../domain/administrative-area-level-1.aggregate';
import { AddAdministrativeAreasLevel1ContextEvent } from '../events/add-administrative-areas-level-1-context.event';

@Injectable()
export class UpdateAdministrativeAreasLevel1Service
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAdministrativeAreaLevel1Repository,
    ) {}

    async main(
        payload: {
            id?: AdministrativeAreaLevel1Id;
            countryId?: AdministrativeAreaLevel1CountryId;
            code?: AdministrativeAreaLevel1Code;
            customCode?: AdministrativeAreaLevel1CustomCode;
            name?: AdministrativeAreaLevel1Name;
            slug?: AdministrativeAreaLevel1Slug;
            latitude?: AdministrativeAreaLevel1Latitude;
            longitude?: AdministrativeAreaLevel1Longitude;
            zoom?: AdministrativeAreaLevel1Zoom;
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
            null, // createdAt
            new AdministrativeAreaLevel1UpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(administrativeAreaLevel1, {
            queryStatement,
            constraint,
            cQMetadata,
            updateOptions: cQMetadata?.repositoryOptions,
        });

        // get objects to delete
        const administrativeAreasLevel1 = await this.repository.get({ queryStatement, constraint, cQMetadata });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const administrativeAreasLevel1Register = this.publisher.mergeObjectContext(
            new AddAdministrativeAreasLevel1ContextEvent(administrativeAreasLevel1),
        );

        administrativeAreasLevel1Register.updated(); // apply event to model events
        administrativeAreasLevel1Register.commit(); // commit all events of model
    }
}