import { commonMockAdministrativeAreaLevel1Data, CommonUpsertAdministrativeAreaLevel1Command } from '@app/common/administrative-area-level-1';
import { CommonUpsertAdministrativeAreaLevel1CommandHandler } from '@app/common/administrative-area-level-1/application/upsert/common-upsert-administrative-area-level-1.command-handler';
import { CommonUpsertAdministrativeAreaLevel1Service } from '@app/common/administrative-area-level-1/application/upsert/common-upsert-administrative-area-level-1.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertAdministrativeAreaLevel1CommandHandler', () =>
{
    let commandHandler: CommonUpsertAdministrativeAreaLevel1CommandHandler;
    let service: CommonUpsertAdministrativeAreaLevel1Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpsertAdministrativeAreaLevel1CommandHandler,
                {
                    provide : CommonUpsertAdministrativeAreaLevel1Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpsertAdministrativeAreaLevel1CommandHandler>(CommonUpsertAdministrativeAreaLevel1CommandHandler);
        service = module.get<CommonUpsertAdministrativeAreaLevel1Service>(CommonUpsertAdministrativeAreaLevel1Service);
    });

    describe('main', () =>
    {
        test('UpsertAdministrativeAreaLevel1CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the CommonUpsertAdministrativeAreaLevel1Service', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpsertAdministrativeAreaLevel1Command(
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
