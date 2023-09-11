import { IamCreateAccountsCommand, iamMockAccountData } from '@app/iam/account';
import { IamCreateAccountsCommandHandler } from '@app/iam/account/application/create/iam-create-accounts.command-handler';
import { IamCreateAccountsService } from '@app/iam/account/application/create/iam-create-accounts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('iamCreateAccountsCommandHandler', () =>
{
    let commandHandler: IamCreateAccountsCommandHandler;

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
    });

    describe('main', () =>
    {
        test('IamCreateAccountsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return IamMockAccountData created', async () =>
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
