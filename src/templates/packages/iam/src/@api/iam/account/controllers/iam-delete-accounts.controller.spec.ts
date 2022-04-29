/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteAccountsController } from './iam-delete-accounts.controller';
import { IamDeleteAccountsHandler } from '../handlers/iam-delete-accounts.handler';

// sources
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamDeleteAccountsController', () =>
{
    let controller: IamDeleteAccountsController;
    let handler: IamDeleteAccountsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamDeleteAccountsController,
            ],
            providers: [
                {
                    provide : IamDeleteAccountsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamDeleteAccountsController>(IamDeleteAccountsController);
        handler = module.get<IamDeleteAccountsHandler>(IamDeleteAccountsHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteAccountsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an accounts deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accounts)));
            expect(await controller.main()).toBe(accounts);
        });
    });
});