/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteAccountByIdController } from './iam-delete-account-by-id.controller';
import { IamDeleteAccountByIdHandler } from '../handlers/iam-delete-account-by-id.handler';

// sources
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamDeleteAccountByIdController', () =>
{
    let controller: IamDeleteAccountByIdController;
    let handler: IamDeleteAccountByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamDeleteAccountByIdController,
            ],
            providers: [
                {
                    provide : IamDeleteAccountByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamDeleteAccountByIdController>(IamDeleteAccountByIdController);
        handler = module.get<IamDeleteAccountByIdHandler>(IamDeleteAccountByIdHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteAccountByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an account deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await controller.main(accounts[0].id)).toBe(accounts[0]);
        });
    });
});