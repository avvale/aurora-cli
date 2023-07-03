/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3/infrastructure/mock/common-mock-administrative-area-level-3.data';
import { CommonCreateAdministrativeAreasLevel3CommandHandler } from './common-create-administrative-areas-level-3.command-handler';
import { CommonCreateAdministrativeAreasLevel3Command } from './common-create-administrative-areas-level-3.command';
import { CommonCreateAdministrativeAreasLevel3Service } from './common-create-administrative-areas-level-3.service';

describe('commonCreateAdministrativeAreasLevel3CommandHandler', () =>
{
    let commandHandler: CommonCreateAdministrativeAreasLevel3CommandHandler;
    let service: CommonCreateAdministrativeAreasLevel3Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateAdministrativeAreasLevel3CommandHandler,
                {
                    provide : CommonCreateAdministrativeAreasLevel3Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonCreateAdministrativeAreasLevel3CommandHandler>(CommonCreateAdministrativeAreasLevel3CommandHandler);
        service = module.get<CommonCreateAdministrativeAreasLevel3Service>(CommonCreateAdministrativeAreasLevel3Service);
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreasLevel3CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return CommonMockAdministrativeAreaLevel3Data createds', async () =>
        {
            expect(await commandHandler.execute(
                new CommonCreateAdministrativeAreasLevel3Command(
                    commonMockAdministrativeAreaLevel3Data,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});