import { CommonCreateAdministrativeAreasLevel1Command, commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { CommonCreateAdministrativeAreasLevel1CommandHandler } from '@app/common/administrative-area-level-1/application/create/common-create-administrative-areas-level-1.command-handler';
import { CommonCreateAdministrativeAreasLevel1Service } from '@app/common/administrative-area-level-1/application/create/common-create-administrative-areas-level-1.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('commonCreateAdministrativeAreasLevel1CommandHandler', () =>
{
    let commandHandler: CommonCreateAdministrativeAreasLevel1CommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateAdministrativeAreasLevel1CommandHandler,
                {
                    provide : CommonCreateAdministrativeAreasLevel1Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonCreateAdministrativeAreasLevel1CommandHandler>(CommonCreateAdministrativeAreasLevel1CommandHandler);
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreasLevel1CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return CommonMockAdministrativeAreaLevel1Data created', async () =>
        {
            expect(await commandHandler.execute(
                new CommonCreateAdministrativeAreasLevel1Command(
                    commonMockAdministrativeAreaLevel1Data,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
