import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteAccountByIdCommandHandler } from './delete-account-by-id.command-handler';
import { accounts } from '../../../../../@apps/iam/account/infrastructure/seeds/account.seed';
import { DeleteAccountByIdCommand } from './delete-account-by-id.command';
import { DeleteAccountByIdService } from './delete-account-by-id.service';

describe('DeleteAccountByIdCommandHandler', () =>
{
    let commandHandler: DeleteAccountByIdCommandHandler;
    let service: DeleteAccountByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteAccountByIdCommandHandler,
                {
                    provide: DeleteAccountByIdService,
                    useValue: {
                        main: () => {},
                    }
                },
            ],
        }).compile();

        commandHandler  = module.get<DeleteAccountByIdCommandHandler>(DeleteAccountByIdCommandHandler);
        service         = module.get<DeleteAccountByIdService>(DeleteAccountByIdService);
    });

    describe('main', () =>
    {
        test('DeleteAccountByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteAccountByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteAccountByIdCommand(
                    accounts[0].id,
                )
            )).toBe(undefined);
        });
    });
});