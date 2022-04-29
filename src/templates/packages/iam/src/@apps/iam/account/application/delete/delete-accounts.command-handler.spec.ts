import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteAccountsCommandHandler } from './delete-accounts.command-handler';
import { DeleteAccountsCommand } from './delete-accounts.command';
import { DeleteAccountsService } from './delete-accounts.service';

describe('DeleteAccountsCommandHandler', () =>
{
    let commandHandler: DeleteAccountsCommandHandler;
    let service: DeleteAccountsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteAccountsCommandHandler,
                {
                    provide: DeleteAccountsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteAccountsCommandHandler>(DeleteAccountsCommandHandler);
        service         = module.get<DeleteAccountsService>(DeleteAccountsService);
    });

    describe('main', () =>
    {
        test('DeleteAccountsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteAccountsCommand()
            )).toBe(undefined);
        });
    });
});