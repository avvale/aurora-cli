/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';
import { UpdateAdministrativeAreasLevel1Service } from './update-administrative-areas-level-1.service';
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
import { MockAdministrativeAreaLevel1Repository } from '../../infrastructure/mock/mock-administrative-area-level-1.repository';

describe('UpdateAdministrativeAreasLevel1Service', () =>
{
    let service: UpdateAdministrativeAreasLevel1Service;
    let repository: IAdministrativeAreaLevel1Repository;
    let mockRepository: MockAdministrativeAreaLevel1Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateAdministrativeAreasLevel1Service,
                MockAdministrativeAreaLevel1Repository,
                {
                    provide : IAdministrativeAreaLevel1Repository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(UpdateAdministrativeAreasLevel1Service);
        repository      = module.get(IAdministrativeAreaLevel1Repository);
        mockRepository  = module.get(MockAdministrativeAreaLevel1Repository);
    });

    describe('main', () =>
    {
        test('UpdateAdministrativeAreasLevel1Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a administrativeAreasLevel1 and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new AdministrativeAreaLevel1Id(administrativeAreasLevel1[0].id),
                    countryId: new AdministrativeAreaLevel1CountryId(administrativeAreasLevel1[0].countryId),
                    code: new AdministrativeAreaLevel1Code(administrativeAreasLevel1[0].code),
                    customCode: new AdministrativeAreaLevel1CustomCode(administrativeAreasLevel1[0].customCode),
                    name: new AdministrativeAreaLevel1Name(administrativeAreasLevel1[0].name),
                    slug: new AdministrativeAreaLevel1Slug(administrativeAreasLevel1[0].slug),
                    latitude: new AdministrativeAreaLevel1Latitude(administrativeAreasLevel1[0].latitude),
                    longitude: new AdministrativeAreaLevel1Longitude(administrativeAreasLevel1[0].longitude),
                    zoom: new AdministrativeAreaLevel1Zoom(administrativeAreasLevel1[0].zoom),
                },
            )).toBe(undefined);
        });
    });
});