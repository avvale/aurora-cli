import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3/infrastructure/mock/common-mock-administrative-area-level-3.data';
import { CommonUpdateAdministrativeAreasLevel3CommandHandler } from './common-update-administrative-areas-level-3.command-handler';
import { CommonUpdateAdministrativeAreasLevel3Command } from './common-update-administrative-areas-level-3.command';
import { CommonUpdateAdministrativeAreasLevel3Service } from './common-update-administrative-areas-level-3.service';

describe('CommonUpdateAdministrativeAreasLevel3CommandHandler', () =>
{
    let commandHandler: CommonUpdateAdministrativeAreasLevel3CommandHandler;
    let service: CommonUpdateAdministrativeAreasLevel3Service;

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
        service = module.get<CommonUpdateAdministrativeAreasLevel3Service>(CommonUpdateAdministrativeAreasLevel3Service);
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