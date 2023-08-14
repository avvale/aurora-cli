import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteResourcesCommandHandler } from './common-delete-resources.command-handler';
import { CommonDeleteResourcesCommand } from './common-delete-resources.command';
import { CommonDeleteResourcesService } from './common-delete-resources.service';

describe('CommonDeleteResourcesCommandHandler', () =>
{
    let commandHandler: CommonDeleteResourcesCommandHandler;
    let service: CommonDeleteResourcesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonDeleteResourcesCommandHandler,
                {
                    provide : CommonDeleteResourcesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonDeleteResourcesCommandHandler>(CommonDeleteResourcesCommandHandler);
        service = module.get<CommonDeleteResourcesService>(CommonDeleteResourcesService);
    });

    describe('main', () =>
    {
        test('CommonDeleteResourcesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new CommonDeleteResourcesCommand(),
            )).toBe(undefined);
        });
    });
});
