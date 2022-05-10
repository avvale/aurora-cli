/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateAccountByIdController } from './iam-update-account-by-id.controller';
import { IamUpdateAccountByIdHandler } from '../handlers/iam-update-account-by-id.handler';

// sources
import { accounts } from '@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamUpdateAccountByIdController', () =>
{
    let controller: IamUpdateAccountByIdController;
    let handler: IamUpdateAccountByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateAccountByIdController,
            ],
            providers: [
                {
                    provide : IamUpdateAccountByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdateAccountByIdController>(IamUpdateAccountByIdController);
        handler = module.get<IamUpdateAccountByIdHandler>(IamUpdateAccountByIdHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateAccountByIdController should be defined', () =>
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