/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { accounts } from '../../../../../@apps/iam/account/infrastructure/seeds/account.seed';
import { CreateAccountsCommandHandler } from './create-accounts.command-handler';
import { CreateAccountsCommand } from './create-accounts.command';
import { CreateAccountsService } from './create-accounts.service';

describe('CreateAccountsCommandHandler', () =>
{
    let commandHandler: CreateAccountsCommandHandler;
    let service: CreateAccountsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAccountsCommandHandler,
                {
                    provide : CreateAccountsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<CreateAccountsCommandHandler>(CreateAccountsCommandHandler);
        service         = module.get<CreateAccountsService>(CreateAccountsService);
    });

    describe('main', () =>
    {
        test('CreateAccountsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return accounts createds', async () =>
        {
            expect(await commandHandler.execute(
                new CreateAccountsCommand(
                    accounts,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});