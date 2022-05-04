/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateAccountController } from './iam-update-account.controller';
import { IamUpdateAccountHandler } from '../handlers/iam-update-account.handler';

// sources
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamUpdateAccountController', () =>
{
    let controller: IamUpdateAccountController;
    let handler: IamUpdateAccountHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateAccountController,
            ],
            providers: [
                {
                    provide : IamUpdateAccountHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamUpdateAccountController>(IamUpdateAccountController);
        handler = module.get<IamUpdateAccountHandler>(IamUpdateAccountHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateAccountController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a account created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await controller.main(accounts[0])).toBe(accounts[0]);
        });
    });
});