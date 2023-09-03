/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonIAdministrativeAreaLevel2Repository, commonMockAdministrativeAreaLevel2Data, CommonMockAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2';
import { CommonUpdateAdministrativeAreaLevel2ByIdService } from '@app/common/administrative-area-level-2/application/update/common-update-administrative-area-level-2-by-id.service';
import {
    CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel2Code,
    CommonAdministrativeAreaLevel2CountryId,
    CommonAdministrativeAreaLevel2CustomCode,
    CommonAdministrativeAreaLevel2Id,
    CommonAdministrativeAreaLevel2Latitude,
    CommonAdministrativeAreaLevel2Longitude,
    CommonAdministrativeAreaLevel2MapType,
    CommonAdministrativeAreaLevel2Name,
    CommonAdministrativeAreaLevel2Slug,
    CommonAdministrativeAreaLevel2Zoom,
} from '@app/common/administrative-area-level-2/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreaLevel2ByIdService', () =>
{
    let service: CommonUpdateAdministrativeAreaLevel2ByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonUpdateAdministrativeAreaLevel2ByIdService,
                CommonMockAdministrativeAreaLevel2Repository,
                {
                    provide : CommonIAdministrativeAreaLevel2Repository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonUpdateAdministrativeAreaLevel2ByIdService);
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreaLevel2ByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a administrativeAreaLevel2 and emit event', async () =>
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
                ),
            ).toBe(undefined);
        });
    });
});
