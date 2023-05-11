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

@Injectable()
export class UpdateAdministrativeAreaLevel2ByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAdministrativeAreaLevel2Repository,
    ) {}

    async main(
        payload: {
            id: AdministrativeAreaLevel2Id;
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


        // update by id
        await this.repository.updateById(administrativeAreaLevel2, { constraint, cQMetadata, updateByIdOptions: cQMetadata?.repositoryOptions });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const administrativeAreaLevel2Register = this.publisher.mergeObjectContext(
            administrativeAreaLevel2,
        );

        administrativeAreaLevel2Register.updated(administrativeAreaLevel2); // apply event to model events
        administrativeAreaLevel2Register.commit(); // commit all events of model
    }
}