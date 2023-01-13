/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateAccountsController } from './iam-update-accounts.controller';
import { IamUpdateAccountsHandler } from '../handlers/iam-update-accounts.handler';

// sources
import { accounts } from '@app/iam/account/infrastructure/seeds/account.seed';

describe('IamUpdateAccountsController', () =>
{
    let controller: IamUpdateAccountsController;
    let handler: IamUpdateAccountsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateAccountsController,
            ],
            providers: [
                {
                    provide : IamUpdateAccountsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdateAccountsController>(IamUpdateAccountsController);
        handler = module.get<IamUpdateAccountsHandler>(IamUpdateAccountsHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateAccountsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a accounts updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await controller.main(accounts[0])).toBe(accounts[0]);
        });
    });
});