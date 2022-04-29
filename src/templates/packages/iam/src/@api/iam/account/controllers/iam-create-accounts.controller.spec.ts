import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateAccountsController } from './iam-create-accounts.controller';
import { IamCreateAccountsHandler } from '../handlers/iam-create-accounts.handler';

// sources
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamCreateAccountsController', () =>
{
    let controller: IamCreateAccountsController;
    let handler: IamCreateAccountsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                IamCreateAccountsController,
            ],
            providers: [
                {
                    provide : IamCreateAccountsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamCreateAccountsController>(IamCreateAccountsController);
        handler = module.get<IamCreateAccountsHandler>(IamCreateAccountsHandler);
    });

    describe('main', () =>
    {
        test('IamCreateAccountsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an accounts created', async () =>
        {
            expect(await controller.main(accounts)).toBe(undefined);
        });
    });
});