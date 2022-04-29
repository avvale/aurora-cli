/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamPaginateAccountsController } from './iam-paginate-accounts.controller';
import { IamPaginateAccountsHandler } from '../handlers/iam-paginate-accounts.handler';

// sources
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamPaginateAccountsController', () =>
{
    let controller: IamPaginateAccountsController;
    let handler: IamPaginateAccountsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamPaginateAccountsController,
            ],
            providers: [
                {
                    provide : IamPaginateAccountsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ]
        }).compile();

        controller = module.get<IamPaginateAccountsController>(IamPaginateAccountsController);
        handler = module.get<IamPaginateAccountsHandler>(IamPaginateAccountsHandler);
    });

    describe('main', () =>
    {
        test('IamPaginateAccountsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a accounts', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : accounts,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : accounts,
            });
        });
    });
});