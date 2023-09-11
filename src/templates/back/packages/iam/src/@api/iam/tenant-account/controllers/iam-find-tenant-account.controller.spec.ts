import { IamFindTenantAccountController, IamFindTenantAccountHandler } from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTenantAccountController', () =>
{
    let controller: IamFindTenantAccountController;
    let handler: IamFindTenantAccountHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamFindTenantAccountController,
            ],
            providers: [
                {
                    provide : IamFindTenantAccountHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamFindTenantAccountController>(IamFindTenantAccountController);
        handler = module.get<IamFindTenantAccountHandler>(IamFindTenantAccountHandler);
    });

    describe('main', () =>
    {
        test('IamFindTenantAccountController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a tenantAccount', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTenantAccountData[0])));
            expect(await controller.main()).toBe(iamMockTenantAccountData[0]);
        });
    });
});
