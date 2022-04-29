import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteApplicationsCommandHandler } from './delete-applications.command-handler';
import { DeleteApplicationsCommand } from './delete-applications.command';
import { DeleteApplicationsService } from './delete-applications.service';

describe('DeleteApplicationsCommandHandler', () =>
{
    let commandHandler: DeleteApplicationsCommandHandler;
    let service: DeleteApplicationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteApplicationsCommandHandler,
                {
                    provide : DeleteApplicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<DeleteApplicationsCommandHandler>(DeleteApplicationsCommandHandler);
        service         = module.get<DeleteApplicationsService>(DeleteApplicationsService);
    });

    describe('main', () =>
    {
        test('DeleteApplicationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteApplicationsCommand(),
            )).toBe(undefined);
        });
    });
});