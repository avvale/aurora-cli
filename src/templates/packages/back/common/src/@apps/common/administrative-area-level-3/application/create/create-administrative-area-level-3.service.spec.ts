/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';
import { CreateAdministrativeAreaLevel3Service } from './create-administrative-area-level-3.service';
import {
    AdministrativeAreaLevel3Id,
    AdministrativeAreaLevel3CountryId,
    AdministrativeAreaLevel3AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel3AdministrativeAreaLevel2Id,
    AdministrativeAreaLevel3Code,
    AdministrativeAreaLevel3CustomCode,
    AdministrativeAreaLevel3Name,
    AdministrativeAreaLevel3Slug,
    AdministrativeAreaLevel3Latitude,
    AdministrativeAreaLevel3Longitude,
    AdministrativeAreaLevel3Zoom,
    AdministrativeAreaLevel3CreatedAt,
    AdministrativeAreaLevel3UpdatedAt,
    AdministrativeAreaLevel3DeletedAt,
} from '../../domain/value-objects';
import { IAdministrativeAreaLevel3Repository } from '../../domain/administrative-area-level-3.repository';
import { MockAdministrativeAreaLevel3Repository } from '../../infrastructure/mock/mock-administrative-area-level-3.repository';

describe('CreateAdministrativeAreaLevel3Service', () =>

{
    let service: CreateAdministrativeAreaLevel3Service;
    let repository: IAdministrativeAreaLevel3Repository;
    let mockRepository: MockAdministrativeAreaLevel3Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateAdministrativeAreaLevel3Service,
                MockAdministrativeAreaLevel3Repository,
                {
                    provide : IAdministrativeAreaLevel3Repository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(CreateAdministrativeAreaLevel3Service);
        repository      = module.get(IAdministrativeAreaLevel3Repository);
        mockRepository  = module.get(MockAdministrativeAreaLevel3Repository);
    });

    describe('main', () =>
    {
        test('CreateAdministrativeAreaLevel3Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a administrativeAreaLevel3 and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new AdministrativeAreaLevel3Id(administrativeAreasLevel3[0].id),
                    countryId: new AdministrativeAreaLevel3CountryId(administrativeAreasLevel3[0].countryId),
                    administrativeAreaLevel1Id: new AdministrativeAreaLevel3AdministrativeAreaLevel1Id(administrativeAreasLevel3[0].administrativeAreaLevel1Id),
                    administrativeAreaLevel2Id: new AdministrativeAreaLevel3AdministrativeAreaLevel2Id(administrativeAreasLevel3[0].administrativeAreaLevel2Id),
                    code: new AdministrativeAreaLevel3Code(administrativeAreasLevel3[0].code),
                    customCode: new AdministrativeAreaLevel3CustomCode(administrativeAreasLevel3[0].customCode),
                    name: new AdministrativeAreaLevel3Name(administrativeAreasLevel3[0].name),
                    slug: new AdministrativeAreaLevel3Slug(administrativeAreasLevel3[0].slug),
                    latitude: new AdministrativeAreaLevel3Latitude(administrativeAreasLevel3[0].latitude),
                    longitude: new AdministrativeAreaLevel3Longitude(administrativeAreasLevel3[0].longitude),
                    zoom: new AdministrativeAreaLevel3Zoom(administrativeAreasLevel3[0].zoom),
                },
            )).toBe(undefined);
        });
    });
});