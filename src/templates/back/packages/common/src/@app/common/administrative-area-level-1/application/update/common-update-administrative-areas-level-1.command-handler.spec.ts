import { commonMockAdministrativeAreaLevel1Data, CommonUpdateAdministrativeAreasLevel1Command } from '@app/common/administrative-area-level-1';
import { CommonUpdateAdministrativeAreasLevel1CommandHandler } from '@app/common/administrative-area-level-1/application/update/common-update-administrative-areas-level-1.command-handler';
import { CommonUpdateAdministrativeAreasLevel1Service } from '@app/common/administrative-area-level-1/application/update/common-update-administrative-areas-level-1.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreasLevel1CommandHandler', () =>
{
    let commandHandler: CommonUpdateAdministrativeAreasLevel1CommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpdateAdministrativeAreasLevel1CommandHandler,
                {
                    provide : CommonUpdateAdministrativeAreasLevel1Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpdateAdministrativeAreasLevel1CommandHandler>(CommonUpdateAdministrativeAreasLevel1CommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAdministrativeAreasLevel1CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an administrativeAreasLevel1 updated', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpdateAdministrativeAreasLevel1Command(
                    {
                        id: commonMockAdministrativeAreaLevel1Data[0].id,
                        countryId: commonMockAdministrativeAreaLevel1Data[0].countryId,
                        code: commonMockAdministrativeAreaLevel1Data[0].code,
                        customCode: commonMockAdministrativeAreaLevel1Data[0].customCode,
                        name: commonMockAdministrativeAreaLevel1Data[0].name,
                        slug: commonMockAdministrativeAreaLevel1Data[0].slug,
                        latitude: commonMockAdministrativeAreaLevel1Data[0].latitude,
                        longitude: commonMockAdministrativeAreaLevel1Data[0].longitude,
                        zoom: commonMockAdministrativeAreaLevel1Data[0].zoom,
                        mapType: commonMockAdministrativeAreaLevel1Data[0].mapType,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
