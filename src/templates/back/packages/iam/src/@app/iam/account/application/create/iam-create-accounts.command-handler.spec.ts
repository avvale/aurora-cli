/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockAccountData } from '@app/iam/account/infrastructure/mock/iam-mock-account.data';
import { IamCreateAccountsCommandHandler } from './iam-create-accounts.command-handler';
import { IamCreateAccountsCommand } from './iam-create-accounts.command';
import { IamCreateAccountsService } from './iam-create-accounts.service';

describe('iamCreateAccountsCommandHandler', () =>
{
    let commandHandler: IamCreateAccountsCommandHandler;
    let service: IamCreateAccountsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateAccountsCommandHandler,
                {
                    provide : IamCreateAccountsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamCreateAccountsCommandHandler>(IamCreateAccountsCommandHandler);
        service = module.get<IamCreateAccountsService>(IamCreateAccountsService);
    });

    describe('main', () =>
    {
        test('IamCreateAccountsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return IamMockAccountData createds', async () =>
        {
            expect(await commandHandler.execute(
                new IamCreateAccountsCommand(
                    iamMockAccountData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
