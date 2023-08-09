/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2/infrastructure/mock/common-mock-administrative-area-level-2.data';
import { CommonCreateAdministrativeAreasLevel2CommandHandler } from './common-create-administrative-areas-level-2.command-handler';
import { CommonCreateAdministrativeAreasLevel2Command } from './common-create-administrative-areas-level-2.command';
import { CommonCreateAdministrativeAreasLevel2Service } from './common-create-administrative-areas-level-2.service';

describe('commonCreateAdministrativeAreasLevel2CommandHandler', () =>
{
    let commandHandler: CommonCreateAdministrativeAreasLevel2CommandHandler;
    let service: CommonCreateAdministrativeAreasLevel2Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateAdministrativeAreasLevel2CommandHandler,
                {
                    provide : CommonCreateAdministrativeAreasLevel2Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonCreateAdministrativeAreasLevel2CommandHandler>(CommonCreateAdministrativeAreasLevel2CommandHandler);
        service = module.get<CommonCreateAdministrativeAreasLevel2Service>(CommonCreateAdministrativeAreasLevel2Service);
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreasLevel2CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return CommonMockAdministrativeAreaLevel2Data createds', async () =>
        {
            expect(await commandHandler.execute(
                new CommonCreateAdministrativeAreasLevel2Command(
                    commonMockAdministrativeAreaLevel2Data,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
