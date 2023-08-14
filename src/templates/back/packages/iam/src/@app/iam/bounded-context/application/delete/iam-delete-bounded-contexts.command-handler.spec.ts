import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteBoundedContextsCommandHandler } from './iam-delete-bounded-contexts.command-handler';
import { IamDeleteBoundedContextsCommand } from './iam-delete-bounded-contexts.command';
import { IamDeleteBoundedContextsService } from './iam-delete-bounded-contexts.service';

describe('IamDeleteBoundedContextsCommandHandler', () =>
{
    let commandHandler: IamDeleteBoundedContextsCommandHandler;
    let service: IamDeleteBoundedContextsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteBoundedContextsCommandHandler,
                {
                    provide : IamDeleteBoundedContextsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamDeleteBoundedContextsCommandHandler>(IamDeleteBoundedContextsCommandHandler);
        service = module.get<IamDeleteBoundedContextsService>(IamDeleteBoundedContextsService);
    });

    describe('main', () =>
    {
        test('IamDeleteBoundedContextsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new IamDeleteBoundedContextsCommand(),
            )).toBe(undefined);
        });
    });
});
