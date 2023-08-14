/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1/infrastructure/mock/common-mock-administrative-area-level-1.data';
import { CommonCreateAdministrativeAreasLevel1CommandHandler } from './common-create-administrative-areas-level-1.command-handler';
import { CommonCreateAdministrativeAreasLevel1Command } from './common-create-administrative-areas-level-1.command';
import { CommonCreateAdministrativeAreasLevel1Service } from './common-create-administrative-areas-level-1.service';

describe('commonCreateAdministrativeAreasLevel1CommandHandler', () =>
{
    let commandHandler: CommonCreateAdministrativeAreasLevel1CommandHandler;
    let service: CommonCreateAdministrativeAreasLevel1Service;

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
        service = module.get<CommonCreateAdministrativeAreasLevel1Service>(CommonCreateAdministrativeAreasLevel1Service);
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreasLevel1CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return CommonMockAdministrativeAreaLevel1Data createds', async () =>
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
