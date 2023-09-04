import { CommonCreateAdministrativeAreaLevel3CommandHandler } from './common-create-administrative-area-level-3.command-handler';
import { CommonCreateAdministrativeAreaLevel3Service } from './common-create-administrative-area-level-3.service';
import { CommonCreateAdministrativeAreaLevel3Command, commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreaLevel3CommandHandler', () =>
{
    let commandHandler: CommonCreateAdministrativeAreaLevel3CommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateAdministrativeAreaLevel3CommandHandler,
                {
                    provide : CommonCreateAdministrativeAreaLevel3Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonCreateAdministrativeAreaLevel3CommandHandler>(CommonCreateAdministrativeAreaLevel3CommandHandler);
    });

    describe('main', () =>
    {
        test('CreateAdministrativeAreaLevel3CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CommonCreateAdministrativeAreaLevel3Service', async () =>
        {
            expect(await commandHandler.execute(
                new CommonCreateAdministrativeAreaLevel3Command(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
