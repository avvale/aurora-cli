/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindAccountController } from './iam-find-account.controller';
import { IamFindAccountHandler } from '../handlers/iam-find-account.handler';

// sources
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamFindAccountController', () =>
{
    let controller: IamFindAccountController;
    let handler: IamFindAccountHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamFindAccountController,
            ],
            providers: [
                {
                    provide : IamFindAccountHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamFindAccountController>(IamFindAccountController);
        handler = module.get<IamFindAccountHandler>(IamFindAccountHandler);
    });

    describe('main', () =>
    {
        test('IamFindAccountController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a account', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await controller.main()).toBe(accounts[0]);
        });
    });
});