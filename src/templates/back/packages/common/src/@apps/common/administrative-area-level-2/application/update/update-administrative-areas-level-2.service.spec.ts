/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';
import { UpdateAdministrativeAreasLevel2Service } from './update-administrative-areas-level-2.service';
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
import { MockAdministrativeAreaLevel2Repository } from '../../infrastructure/mock/mock-administrative-area-level-2.repository';

describe('UpdateAdministrativeAreasLevel2Service', () =>
{
    let service: UpdateAdministrativeAreasLevel2Service;
    let repository: IAdministrativeAreaLevel2Repository;
    let mockRepository: MockAdministrativeAreaLevel2Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateAdministrativeAreasLevel2Service,
                MockAdministrativeAreaLevel2Repository,
                {
                    provide : IAdministrativeAreaLevel2Repository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(UpdateAdministrativeAreasLevel2Service);
        repository      = module.get(IAdministrativeAreaLevel2Repository);
        mockRepository  = module.get(MockAdministrativeAreaLevel2Repository);
    });

    describe('main', () =>
    {
        test('UpdateAdministrativeAreasLevel2Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a administrativeAreasLevel2 and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new AdministrativeAreaLevel2Id(administrativeAreasLevel2[0].id),
                    countryId: new AdministrativeAreaLevel2CountryId(administrativeAreasLevel2[0].countryId),
                    administrativeAreaLevel1Id: new AdministrativeAreaLevel2AdministrativeAreaLevel1Id(administrativeAreasLevel2[0].administrativeAreaLevel1Id),
                    code: new AdministrativeAreaLevel2Code(administrativeAreasLevel2[0].code),
                    customCode: new AdministrativeAreaLevel2CustomCode(administrativeAreasLevel2[0].customCode),
                    name: new AdministrativeAreaLevel2Name(administrativeAreasLevel2[0].name),
                    slug: new AdministrativeAreaLevel2Slug(administrativeAreasLevel2[0].slug),
                    latitude: new AdministrativeAreaLevel2Latitude(administrativeAreasLevel2[0].latitude),
                    longitude: new AdministrativeAreaLevel2Longitude(administrativeAreasLevel2[0].longitude),
                    zoom: new AdministrativeAreaLevel2Zoom(administrativeAreasLevel2[0].zoom),
                },
            )).toBe(undefined);
        });
    });
});