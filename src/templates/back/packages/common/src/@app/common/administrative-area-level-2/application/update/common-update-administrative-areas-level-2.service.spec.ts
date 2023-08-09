/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2/infrastructure/mock/common-mock-administrative-area-level-2.data';
import { CommonUpdateAdministrativeAreasLevel2Service } from './common-update-administrative-areas-level-2.service';
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
import { CommonMockAdministrativeAreaLevel2Repository } from '../../infrastructure/mock/common-mock-administrative-area-level-2.repository';

describe('CommonUpdateAdministrativeAreasLevel2Service', () =>
{
    let service: CommonUpdateAdministrativeAreasLevel2Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonUpdateAdministrativeAreasLevel2Service,
                CommonMockAdministrativeAreaLevel2Repository,
                {
                    provide : CommonIAdministrativeAreaLevel2Repository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonUpdateAdministrativeAreasLevel2Service);
    });

    describe('main', () =>
    {
        test('UpdateAdministrativeAreasLevel2Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a administrativeAreasLevel2 and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new CommonAdministrativeAreaLevel2Id(commonMockAdministrativeAreaLevel2Data[0].id),
                        countryId: new CommonAdministrativeAreaLevel2CountryId(commonMockAdministrativeAreaLevel2Data[0].countryId),
                        administrativeAreaLevel1Id: new CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id(commonMockAdministrativeAreaLevel2Data[0].administrativeAreaLevel1Id),
                        code: new CommonAdministrativeAreaLevel2Code(commonMockAdministrativeAreaLevel2Data[0].code),
                        customCode: new CommonAdministrativeAreaLevel2CustomCode(commonMockAdministrativeAreaLevel2Data[0].customCode),
                        name: new CommonAdministrativeAreaLevel2Name(commonMockAdministrativeAreaLevel2Data[0].name),
                        slug: new CommonAdministrativeAreaLevel2Slug(commonMockAdministrativeAreaLevel2Data[0].slug),
                        latitude: new CommonAdministrativeAreaLevel2Latitude(commonMockAdministrativeAreaLevel2Data[0].latitude),
                        longitude: new CommonAdministrativeAreaLevel2Longitude(commonMockAdministrativeAreaLevel2Data[0].longitude),
                        zoom: new CommonAdministrativeAreaLevel2Zoom(commonMockAdministrativeAreaLevel2Data[0].zoom),
                        mapType: new CommonAdministrativeAreaLevel2MapType(commonMockAdministrativeAreaLevel2Data[0].mapType),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
