import { commonMockAdministrativeAreaLevel3Data, CommonUpdateAdministrativeAreasLevel3Command } from '@app/common/administrative-area-level-3';
import { CommonUpdateAdministrativeAreasLevel3CommandHandler } from '@app/common/administrative-area-level-3/application/update/common-update-administrative-areas-level-3.command-handler';
import { CommonUpdateAdministrativeAreasLevel3Service } from '@app/common/administrative-area-level-3/application/update/common-update-administrative-areas-level-3.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreasLevel3CommandHandler', () =>
{
    let commandHandler: CommonUpdateAdministrativeAreasLevel3CommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpdateAdministrativeAreasLevel3CommandHandler,
                {
                    provide : CommonUpdateAdministrativeAreasLevel3Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpdateAdministrativeAreasLevel3CommandHandler>(CommonUpdateAdministrativeAreasLevel3CommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAdministrativeAreasLevel3CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an administrativeAreasLevel3 updated', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpdateAdministrativeAreasLevel3Command(
                    {
                        id: commonMockAdministrativeAreaLevel3Data[0].id,
                        countryId: commonMockAdministrativeAreaLevel3Data[0].countryId,
                        administrativeAreaLevel1Id: commonMockAdministrativeAreaLevel3Data[0].administrativeAreaLevel1Id,
                        administrativeAreaLevel2Id: commonMockAdministrativeAreaLevel3Data[0].administrativeAreaLevel2Id,
                        code: commonMockAdministrativeAreaLevel3Data[0].code,
                        customCode: commonMockAdministrativeAreaLevel3Data[0].customCode,
                        name: commonMockAdministrativeAreaLevel3Data[0].name,
                        slug: commonMockAdministrativeAreaLevel3Data[0].slug,
                        latitude: commonMockAdministrativeAreaLevel3Data[0].latitude,
                        longitude: commonMockAdministrativeAreaLevel3Data[0].longitude,
                        zoom: commonMockAdministrativeAreaLevel3Data[0].zoom,
                        mapType: commonMockAdministrativeAreaLevel3Data[0].mapType,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
