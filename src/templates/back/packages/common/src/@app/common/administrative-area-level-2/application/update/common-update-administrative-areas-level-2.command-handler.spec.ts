import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2/infrastructure/mock/common-mock-administrative-area-level-2.data';
import { CommonUpdateAdministrativeAreasLevel2CommandHandler } from './common-update-administrative-areas-level-2.command-handler';
import { CommonUpdateAdministrativeAreasLevel2Command } from './common-update-administrative-areas-level-2.command';
import { CommonUpdateAdministrativeAreasLevel2Service } from './common-update-administrative-areas-level-2.service';

describe('CommonUpdateAdministrativeAreasLevel2CommandHandler', () =>
{
    let commandHandler: CommonUpdateAdministrativeAreasLevel2CommandHandler;
    let service: CommonUpdateAdministrativeAreasLevel2Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpdateAdministrativeAreasLevel2CommandHandler,
                {
                    provide : CommonUpdateAdministrativeAreasLevel2Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpdateAdministrativeAreasLevel2CommandHandler>(CommonUpdateAdministrativeAreasLevel2CommandHandler);
        service = module.get<CommonUpdateAdministrativeAreasLevel2Service>(CommonUpdateAdministrativeAreasLevel2Service);
    });

    describe('main', () =>
    {
        test('UpdateAdministrativeAreasLevel2CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an administrativeAreasLevel2 updated', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpdateAdministrativeAreasLevel2Command(
                    {
                        id: commonMockAdministrativeAreaLevel2Data[0].id,
                        countryId: commonMockAdministrativeAreaLevel2Data[0].countryId,
                        administrativeAreaLevel1Id: commonMockAdministrativeAreaLevel2Data[0].administrativeAreaLevel1Id,
                        code: commonMockAdministrativeAreaLevel2Data[0].code,
                        customCode: commonMockAdministrativeAreaLevel2Data[0].customCode,
                        name: commonMockAdministrativeAreaLevel2Data[0].name,
                        slug: commonMockAdministrativeAreaLevel2Data[0].slug,
                        latitude: commonMockAdministrativeAreaLevel2Data[0].latitude,
                        longitude: commonMockAdministrativeAreaLevel2Data[0].longitude,
                        zoom: commonMockAdministrativeAreaLevel2Data[0].zoom,
                        mapType: commonMockAdministrativeAreaLevel2Data[0].mapType,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});