import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteAccountsCommandHandler } from './iam-delete-accounts.command-handler';
import { IamDeleteAccountsCommand } from './iam-delete-accounts.command';
import { IamDeleteAccountsService } from './iam-delete-accounts.service';

describe('IamDeleteAccountsCommandHandler', () =>
{
    let commandHandler: IamDeleteAccountsCommandHandler;
    let service: IamDeleteAccountsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteAccountsCommandHandler,
                {
                    provide : IamDeleteAccountsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamDeleteAccountsCommandHandler>(IamDeleteAccountsCommandHandler);
        service = module.get<IamDeleteAccountsService>(IamDeleteAccountsService);
    });

    describe('main', () =>
    {
        test('IamDeleteAccountsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new IamDeleteAccountsCommand(),
            )).toBe(undefined);
        });
    });
});
