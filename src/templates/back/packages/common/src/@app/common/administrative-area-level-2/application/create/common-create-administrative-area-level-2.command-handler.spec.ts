import { CommonCreateAdministrativeAreaLevel2CommandHandler } from './common-create-administrative-area-level-2.command-handler';
import { CommonCreateAdministrativeAreaLevel2Service } from './common-create-administrative-area-level-2.service';
import { CommonCreateAdministrativeAreaLevel2Command, commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreaLevel2CommandHandler', () =>
{
    let commandHandler: CommonCreateAdministrativeAreaLevel2CommandHandler;
    let service: CommonCreateAdministrativeAreaLevel2Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateAdministrativeAreaLevel2CommandHandler,
                {
                    provide : CommonCreateAdministrativeAreaLevel2Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonCreateAdministrativeAreaLevel2CommandHandler>(CommonCreateAdministrativeAreaLevel2CommandHandler);
        service = module.get<CommonCreateAdministrativeAreaLevel2Service>(CommonCreateAdministrativeAreaLevel2Service);
    });

    describe('main', () =>
    {
        test('CreateAdministrativeAreaLevel2CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CommonCreateAdministrativeAreaLevel2Service', async () =>
        {
            expect(await commandHandler.execute(
                new CommonCreateAdministrativeAreaLevel2Command(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});