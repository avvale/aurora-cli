import { IamFindRoleAccountController, IamFindRoleAccountHandler } from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindRoleAccountController', () =>
{
    let controller: IamFindRoleAccountController;
    let handler: IamFindRoleAccountHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamFindRoleAccountController,
            ],
            providers: [
                {
                    provide : IamFindRoleAccountHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamFindRoleAccountController>(IamFindRoleAccountController);
        handler = module.get<IamFindRoleAccountHandler>(IamFindRoleAccountHandler);
    });

    describe('main', () =>
    {
        test('IamFindRoleAccountController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a roleAccount', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockRoleAccountData[0])));
            expect(await controller.main()).toBe(iamMockRoleAccountData[0]);
        });
    });
});
