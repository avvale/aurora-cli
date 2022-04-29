/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamGetAccountsController } from './iam-get-accounts.controller';
import { IamGetAccountsHandler } from '../handlers/iam-get-accounts.handler';

// sources
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamGetAccountsController', () =>
{
    let controller: IamGetAccountsController;
    let handler: IamGetAccountsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamGetAccountsController,
            ],
            providers: [
                {
                    provide : IamGetAccountsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamGetAccountsController>(IamGetAccountsController);
        handler = module.get<IamGetAccountsHandler>(IamGetAccountsHandler);
    });

    describe('main', () =>
    {
        test('IamGetAccountsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a accounts', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accounts)));
            expect(await controller.main()).toBe(accounts);
        });
    });
});