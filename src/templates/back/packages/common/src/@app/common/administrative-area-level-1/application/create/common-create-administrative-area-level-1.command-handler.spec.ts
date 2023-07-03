import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1/infrastructure/mock/common-mock-administrative-area-level-1.data';
import { CommonCreateAdministrativeAreaLevel1CommandHandler } from './common-create-administrative-area-level-1.command-handler';
import { CommonCreateAdministrativeAreaLevel1Command } from './common-create-administrative-area-level-1.command';
import { CommonCreateAdministrativeAreaLevel1Service } from './common-create-administrative-area-level-1.service';

describe('CommonCreateAdministrativeAreaLevel1CommandHandler', () =>
{
    let commandHandler: CommonCreateAdministrativeAreaLevel1CommandHandler;
    let service: CommonCreateAdministrativeAreaLevel1Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateAdministrativeAreaLevel1CommandHandler,
                {
                    provide : CommonCreateAdministrativeAreaLevel1Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonCreateAdministrativeAreaLevel1CommandHandler>(CommonCreateAdministrativeAreaLevel1CommandHandler);
        service = module.get<CommonCreateAdministrativeAreaLevel1Service>(CommonCreateAdministrativeAreaLevel1Service);
    });

    describe('main', () =>
    {
        test('CreateAdministrativeAreaLevel1CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CommonCreateAdministrativeAreaLevel1Service', async () =>
        {
            expect(await commandHandler.execute(
                new CommonCreateAdministrativeAreaLevel1Command(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});