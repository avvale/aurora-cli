import { IamGetAccountsController, IamGetAccountsHandler } from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

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
        })
            .compile();

        controller = module.get<IamGetAccountsController>(IamGetAccountsController);
        handler = module.get<IamGetAccountsHandler>(IamGetAccountsHandler);
    });

    describe('main', () =>
    {
        test('IamGetAccountsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a iamMockAccountData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockAccountData)));
            expect(await controller.main()).toBe(iamMockAccountData);
        });
    });
});
