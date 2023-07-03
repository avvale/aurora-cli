/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3/infrastructure/mock/common-mock-administrative-area-level-3.data';
import { CommonCreateAdministrativeAreaLevel3Service } from './common-create-administrative-area-level-3.service';
import {
    CommonAdministrativeAreaLevel3Id,
    CommonAdministrativeAreaLevel3CountryId,
    CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id,
    CommonAdministrativeAreaLevel3Code,
    CommonAdministrativeAreaLevel3CustomCode,
    CommonAdministrativeAreaLevel3Name,
    CommonAdministrativeAreaLevel3Slug,
    CommonAdministrativeAreaLevel3Latitude,
    CommonAdministrativeAreaLevel3Longitude,
    CommonAdministrativeAreaLevel3Zoom,
    CommonAdministrativeAreaLevel3MapType,
    CommonAdministrativeAreaLevel3CreatedAt,
    CommonAdministrativeAreaLevel3UpdatedAt,
    CommonAdministrativeAreaLevel3DeletedAt,
} from '../../domain/value-objects';
import { CommonIAdministrativeAreaLevel3Repository } from '../../domain/common-administrative-area-level-3.repository';
import { CommonMockAdministrativeAreaLevel3Repository } from '../../infrastructure/mock/common-mock-administrative-area-level-3.repository';

describe('CommonCreateAdministrativeAreaLevel3Service', () =>

{
    let service: CommonCreateAdministrativeAreaLevel3Service;
    let repository: CommonIAdministrativeAreaLevel3Repository;
    let mockRepository: CommonMockAdministrativeAreaLevel3Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonCreateAdministrativeAreaLevel3Service,
                CommonMockAdministrativeAreaLevel3Repository,
                {
                    provide : CommonIAdministrativeAreaLevel3Repository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonCreateAdministrativeAreaLevel3Service);
        repository = module.get(CommonIAdministrativeAreaLevel3Repository);
        mockRepository = module.get(CommonMockAdministrativeAreaLevel3Repository);
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreaLevel3Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a administrativeAreaLevel3 and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new CommonAdministrativeAreaLevel3Id(commonMockAdministrativeAreaLevel3Data[0].id),
                    countryId: new CommonAdministrativeAreaLevel3CountryId(commonMockAdministrativeAreaLevel3Data[0].countryId),
                    administrativeAreaLevel1Id: new CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id(commonMockAdministrativeAreaLevel3Data[0].administrativeAreaLevel1Id),
                    administrativeAreaLevel2Id: new CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id(commonMockAdministrativeAreaLevel3Data[0].administrativeAreaLevel2Id),
                    code: new CommonAdministrativeAreaLevel3Code(commonMockAdministrativeAreaLevel3Data[0].code),
                    customCode: new CommonAdministrativeAreaLevel3CustomCode(commonMockAdministrativeAreaLevel3Data[0].customCode),
                    name: new CommonAdministrativeAreaLevel3Name(commonMockAdministrativeAreaLevel3Data[0].name),
                    slug: new CommonAdministrativeAreaLevel3Slug(commonMockAdministrativeAreaLevel3Data[0].slug),
                    latitude: new CommonAdministrativeAreaLevel3Latitude(commonMockAdministrativeAreaLevel3Data[0].latitude),
                    longitude: new CommonAdministrativeAreaLevel3Longitude(commonMockAdministrativeAreaLevel3Data[0].longitude),
                    zoom: new CommonAdministrativeAreaLevel3Zoom(commonMockAdministrativeAreaLevel3Data[0].zoom),
                    mapType: new CommonAdministrativeAreaLevel3MapType(commonMockAdministrativeAreaLevel3Data[0].mapType),
                },
            )).toBe(undefined);
        });
    });
});