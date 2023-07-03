import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2/infrastructure/mock/common-mock-administrative-area-level-2.data';
import { CommonUpsertAdministrativeAreaLevel2CommandHandler } from './common-upsert-administrative-area-level-2.command-handler';
import { CommonUpsertAdministrativeAreaLevel2Command } from './common-upsert-administrative-area-level-2.command';
import { CommonUpsertAdministrativeAreaLevel2Service } from './common-upsert-administrative-area-level-2.service';

describe('CommonUpsertAdministrativeAreaLevel2CommandHandler', () =>
{
    let commandHandler: CommonUpsertAdministrativeAreaLevel2CommandHandler;
    let service: CommonUpsertAdministrativeAreaLevel2Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpsertAdministrativeAreaLevel2CommandHandler,
                {
                    provide : CommonUpsertAdministrativeAreaLevel2Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpsertAdministrativeAreaLevel2CommandHandler>(CommonUpsertAdministrativeAreaLevel2CommandHandler);
        service = module.get<CommonUpsertAdministrativeAreaLevel2Service>(CommonUpsertAdministrativeAreaLevel2Service);
    });

    describe('main', () =>
    {
        test('UpsertAdministrativeAreaLevel2CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the CommonUpsertAdministrativeAreaLevel2Service', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpsertAdministrativeAreaLevel2Command(
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