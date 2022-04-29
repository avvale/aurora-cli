/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindAccountByIdController } from './iam-find-account-by-id.controller';
import { IamFindAccountByIdHandler } from '../handlers/iam-find-account-by-id.handler';

// sources
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamFindAccountByIdController', () =>
{
    let controller: IamFindAccountByIdController;
    let handler: IamFindAccountByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamFindAccountByIdController,
            ],
            providers: [
                {
                    provide : IamFindAccountByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamFindAccountByIdController>(IamFindAccountByIdController);
        handler = module.get<IamFindAccountByIdHandler>(IamFindAccountByIdHandler);
    });

    describe('main', () =>
    {
        test('IamFindAccountByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an account by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await controller.main(accounts[0].id)).toBe(accounts[0]);
        });
    });
});