/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockLangData } from '@app/common/lang/infrastructure/mock/common-mock-lang.data';
import { CommonCreateLangsCommandHandler } from './common-create-langs.command-handler';
import { CommonCreateLangsCommand } from './common-create-langs.command';
import { CommonCreateLangsService } from './common-create-langs.service';

describe('commonCreateLangsCommandHandler', () =>
{
    let commandHandler: CommonCreateLangsCommandHandler;
    let service: CommonCreateLangsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateLangsCommandHandler,
                {
                    provide : CommonCreateLangsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonCreateLangsCommandHandler>(CommonCreateLangsCommandHandler);
        service = module.get<CommonCreateLangsService>(CommonCreateLangsService);
    });

    describe('main', () =>
    {
        test('CommonCreateLangsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return CommonMockLangData createds', async () =>
        {
            expect(await commandHandler.execute(
                new CommonCreateLangsCommand(
                    commonMockLangData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
