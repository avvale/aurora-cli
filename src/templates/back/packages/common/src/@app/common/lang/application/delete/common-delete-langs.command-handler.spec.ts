import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteLangsCommandHandler } from './common-delete-langs.command-handler';
import { CommonDeleteLangsCommand } from './common-delete-langs.command';
import { CommonDeleteLangsService } from './common-delete-langs.service';

describe('CommonDeleteLangsCommandHandler', () =>
{
    let commandHandler: CommonDeleteLangsCommandHandler;
    let service: CommonDeleteLangsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonDeleteLangsCommandHandler,
                {
                    provide : CommonDeleteLangsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonDeleteLangsCommandHandler>(CommonDeleteLangsCommandHandler);
        service = module.get<CommonDeleteLangsService>(CommonDeleteLangsService);
    });

    describe('main', () =>
    {
        test('CommonDeleteLangsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new CommonDeleteLangsCommand(),
            )).toBe(undefined);
        });
    });
});
