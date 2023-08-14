import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteAccountByIdCommandHandler } from './iam-delete-account-by-id.command-handler';
import { iamMockAccountData } from '@app/iam/account/infrastructure/mock/iam-mock-account.data';
import { IamDeleteAccountByIdCommand } from './iam-delete-account-by-id.command';
import { IamDeleteAccountByIdService } from './iam-delete-account-by-id.service';

describe('IamDeleteAccountByIdCommandHandler', () =>
{
    let commandHandler: IamDeleteAccountByIdCommandHandler;
    let service: IamDeleteAccountByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteAccountByIdCommandHandler,
                {
                    provide : IamDeleteAccountByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamDeleteAccountByIdCommandHandler>(IamDeleteAccountByIdCommandHandler);
        service = module.get<IamDeleteAccountByIdService>(IamDeleteAccountByIdService);
    });

    describe('main', () =>
    {
        test('IamDeleteAccountByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the IamDeleteAccountByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new IamDeleteAccountByIdCommand(
                    iamMockAccountData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
