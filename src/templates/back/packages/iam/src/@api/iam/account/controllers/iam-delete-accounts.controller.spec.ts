import { IamDeleteAccountsController, IamDeleteAccountsHandler } from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

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
        })
            .compile();

        controller = module.get<IamDeleteAccountsController>(IamDeleteAccountsController);
        handler = module.get<IamDeleteAccountsHandler>(IamDeleteAccountsHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteAccountsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an iamMockAccountData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockAccountData)));
            expect(await controller.main()).toBe(iamMockAccountData);
        });
    });
});
